/** Debug the Wikimedia Commons audio path step by step. */
const UA = 'MedQ-Education-Agent/1.0 (medical education question generator; Next.js server)';

// Step 1: API search
const apiUrl =
  'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search' +
  '&gsrsearch=' + encodeURIComponent('mitral valve prolapse filetype:audio') +
  '&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url%7Cmime%7Csize%7Cextmetadata';
console.log('1. API URL:', apiUrl);
try {
  const res = await fetch(apiUrl, { headers: { 'User-Agent': UA } });
  console.log('   status:', res.status);
  const text = await res.text();
  console.log('   body length:', text.length);
  try {
    const data = JSON.parse(text);
    const pages = data.query?.pages || {};
    for (const p of Object.values<any>(pages)) {
      const ii = p.imageinfo?.[0];
      console.log(`   - ${p.title} | ${ii?.mime} | ${ii?.size} | ${ii?.url?.slice(0, 70)}`);
    }
  } catch {
    console.log('   NOT JSON:', text.slice(0, 300));
  }
} catch (err: any) {
  console.log('   FETCH FAILED:', err?.message || err);
}

// Step 2: download a known file with bun fetch + UA
console.log('\n2. Direct file download test:');
try {
  const res = await fetch('https://upload.wikimedia.org/wikipedia/commons/8/85/Ventricular_Septal_Defect.wav', {
    headers: { 'User-Agent': UA, Accept: 'audio/*,*/*' },
  });
  console.log('   status:', res.status, '| content-type:', res.headers.get('content-type'));
  const buf = Buffer.from(await res.arrayBuffer());
  console.log('   bytes:', buf.length, '| magic:', buf.subarray(0, 4).toString('latin1'));
} catch (err: any) {
  console.log('   FETCH FAILED:', err?.message || err);
}

// Step 3: ffmpeg transcode of a downloaded ogg
console.log('\n3. Transcode test:');
try {
  const res = await fetch('https://upload.wikimedia.org/wikipedia/commons/c/c7/Crackles_pneumoniaO.ogg', {
    headers: { 'User-Agent': UA },
  });
  console.log('   download status:', res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  console.log('   bytes:', buf.length, '| magic:', buf.subarray(0, 4).toString('latin1'));
  if (buf.length > 1000) {
    const { execFileSync } = await import('child_process');
    const fs = await import('fs');
    fs.writeFileSync('/tmp/t3.ogg', buf);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', '/tmp/t3.ogg', '-t', '90', '-codec:a', 'libmp3lame', '-b:a', '128k', '/tmp/t3.mp3']);
    console.log('   transcode OK:', fs.statSync('/tmp/t3.mp3').size, 'bytes');
  }
} catch (err: any) {
  console.log('   FAILED:', err?.message || err);
}

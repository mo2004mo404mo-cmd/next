#!/bin/bash
# Authenticated check: does /api/questions (the Question Bank source) actually
# return the 3 chat-generated "short stature" questions? Proves they are in the
# bank and visible, and shows their position in the default (createdAt desc)
# ordering — the user should see them at/near the top of page 1.
set -e
BASE=http://localhost:3000
JAR=/tmp/medq-bank-check.jar
rm -f "$JAR"

CSRF=$(curl -s -c "$JAR" "$BASE/api/auth/csrf" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>console.log(JSON.parse(d).csrfToken))")

curl -s -b "$JAR" -c "$JAR" -X POST "$BASE/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Origin: $BASE" \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  -o /dev/null

echo "--- session:"
curl -s -b "$JAR" "$BASE/api/auth/session" | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{const j=JSON.parse(d);console.log(j?.user?.email ?? 'NO SESSION')})"

echo "--- /api/questions?search=short%20stature (page 1):"
curl -s -b "$JAR" "$BASE/api/questions?page=1&limit=10&search=short%20stature" | node -e "
let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{
  const j=JSON.parse(d);
  const qs=j.questions||j;
  console.log('total:', j.total ?? (Array.isArray(qs)?qs.length:'?'));
  (Array.isArray(qs)?qs:[]).slice(0,5).forEach((q,i)=>console.log(\`  \${i+1}. [\${q.difficulty}] \${q.topic} — \${String(q.text||'').slice(0,60)}... imageUrl=\${q.imageUrl?'YES':'empty'} tags=\${(q.tags||'').slice(0,60)}\`));
})"

echo "--- /api/questions default page 1 top 3 (createdAt desc):"
curl -s -b "$JAR" "$BASE/api/questions?page=1&limit=3" | node -e "
let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{
  const j=JSON.parse(d);
  const qs=j.questions||[];
  qs.forEach((q,i)=>console.log(\`  \${i+1}. \${q.topic} (\${q.createdAt})\`));
})"

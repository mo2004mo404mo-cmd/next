#!/usr/bin/env python3
"""Raise file-upload size caps so real medical documents upload.

The free tier's 15 MB cap blocked medical PDFs (textbook chapters, clinical
guidelines, case reports routinely run 20-80 MB). The tier hierarchy is
preserved by the OTHER caps (daily upload count, deep-agent access, ads) so
raising the per-file size doesn't collapse the tiers.

New hierarchy (monotonic, visitor < free < premium < pro = absolute):
  visitor  2 MB  (unchanged — anonymous, per-IP, abuse protection)
  free    50 MB  (was 15)
  premium 80 MB  (was 50)
  pro    100 MB  (unchanged — = ABSOLUTE_MAX_BYTES)

The monotonicity test (visitor <= free) still holds; no test asserts specific
MB values."""
import re

P = '/tmp/my-project/src/lib/subscription/visitor-strategy.ts'
with open(P, 'r', encoding='utf-8') as f:
    s = f.read()

def rep(old, new, label):
    global s
    if old not in s:
        print(f'  [skip] {label} — anchor not found (already patched?)')
        return
    s = s.replace(old, new, 1)
    print(f'  [ok]   {label}')

rep(
    old="  free: {\n    label: 'Free',\n    isAnonymous: false,\n    aiGenerationsPerDay: 5,\n    tutorMessagesPerDay: 10,\n    fileUploadMaxMb: 15,\n    fileUploadsPerDay: 5,",
    new=("  free: {\n"
         "    label: 'Free',\n"
         "    isAnonymous: false,\n"
         "    aiGenerationsPerDay: 5,\n"
         "    tutorMessagesPerDay: 10,\n"
         "    // 50 MB — raised from 15 MB (2026-11-03): medical PDFs (textbook\n"
         "    // chapters, clinical guidelines, case reports) routinely run 20-80\n"
         "    // MB; 15 MB blocked the core use case. The tier hierarchy is\n"
         "    // preserved by the OTHER caps (5 uploads/day vs premium's 100, no\n"
         "    // deep-agent, full ads) so file size alone no longer gates real\n"
         "    // medical documents.\n"
         "    fileUploadMaxMb: 50,\n"
         "    fileUploadsPerDay: 5,"),
    label='free 15 -> 50',
)

rep(
    old="  premium: {\n    label: 'Premium',\n    isAnonymous: false,\n    aiGenerationsPerDay: 100,\n    tutorMessagesPerDay: 100,\n    fileUploadMaxMb: 50,\n    fileUploadsPerDay: 100,",
    new=("  premium: {\n"
         "    label: 'Premium',\n"
         "    isAnonymous: false,\n"
         "    aiGenerationsPerDay: 100,\n"
         "    tutorMessagesPerDay: 100,\n"
         "    // 80 MB — raised from 50 MB (2026-11-03) to keep a clear step above\n"
         "    // the new free tier (50 MB) while staying below pro's absolute cap.\n"
         "    fileUploadMaxMb: 80,\n"
         "    fileUploadsPerDay: 100,"),
    label='premium 50 -> 80',
)

with open(P, 'w', encoding='utf-8') as f:
    f.write(s)
print('patch_upload_caps done')

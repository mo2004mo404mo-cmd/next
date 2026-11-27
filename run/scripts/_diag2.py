import sys
s = chr(91) + "makeDraft('a')" + chr(93)
with open('/tmp/diag_out.txt', 'w') as f:
    f.write(s)

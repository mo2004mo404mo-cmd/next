LB = chr(91)
RB = chr(93)
M_LITERAL = chr(109)  # 'm'
s = LB + M_LITERAL + "akeDraft('a')" + RB
with open('/tmp/diag3.txt', 'wb') as f:
    f.write(s.encode())

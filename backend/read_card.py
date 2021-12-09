# 0009709371 || 148 10043 || 94273B 

def dec_to_base(N, base):  # функция перевода 10 в 16
    if not hasattr(dec_to_base, 'table'):
        dec_to_base.table = '0123456789ABCDEF'
    x, y = divmod(N, base)
    return dec_to_base(x, base) + dec_to_base.table[y] if x else dec_to_base.table[y]

def dec_to_base_SN(s, n):
    seria = dec_to_base(int(s), 16)
    number = dec_to_base(int(n), 16)
    card = seria + number
    return card

# print(dec_to_base(int('0001620178'), 16))
# print(dec_to_base_SN('024', '47314'))
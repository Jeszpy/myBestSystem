def dec_to_base(N, base):  # функция перевода 10 в 16
    if not hasattr(dec_to_base, 'table'):
        dec_to_base.table = '0123456789ABCDEF'
    x, y = divmod(N, base)
    return dec_to_base(x, base) + dec_to_base.table[y] if x else dec_to_base.table[y]

# example = dec_to_base(int('0009709371'), 16)

# print(example)
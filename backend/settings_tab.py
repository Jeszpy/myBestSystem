import psutil

def cpu_and_ram_usage():
  cpu = psutil.cpu_percent(0.3)
  ram = psutil.virtual_memory()
  ram = ram.percent
  arr = [cpu, ram]
  return arr

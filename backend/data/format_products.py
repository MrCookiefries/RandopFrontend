import csv

with open("products-clean.csv") as f:
    a = [{k: (v if k != 'Variant Price' else float(v)) for k, v in row.items()}
            for row in csv.DictReader(f, skipinitialspace=True)
    ]

    file = open("products_dicts.txt", "w")
    file.write(f"{a}")
    file.close()

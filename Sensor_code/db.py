import pymysql


class Database():
    def __init__(self):
        self.db = pymysql.connect(host='localhost', port=3306, user='pi',
                                  passwd='010302010302', db='Playground', charset='utf8')
        self.cursor = self.db.cursor()

    def show(self):
        sql = """SELECT * from sensor """
        self.cursor.execute(sql)
        result = self.cursor.fetchall()
        return(result)

    def insert(self, dust, ultradust, level, air, temperature, humidity):
        sql = """INSERT INTO sensor (dust, ultradust, level, air, temperature, humidity) VALUES (%s, %s, %s, %s, %s, %s)"""
        self.cursor.execute(sql, (dust, ultradust, level,
                                  air, temperature, humidity))
        self.db.commit()


if __name__ == "__main__":
    db = Database()
    db.show()

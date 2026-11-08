import pymysql

pymysql.install_as_MySQLdb()

# Django's MySQL backend checks the mysqlclient version.
# PyMySQL provides a different versioning scheme.
# This compatibility setting may be needed with some Django versions.
pymysql.version_info = (2, 2, 1, "final", 0)

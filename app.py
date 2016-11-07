#!flask/bin/python
from flask import Flask, request, send_from_directory

app = Flask(__name__,static_folder = 'public', static_url_path='')

@app.route('/')
def index():
    return "Hello, World!"
@app.route('/view')
def view():
	return send_from_directory('./public','index.html')
if __name__ == '__main__':
    app.run(debug=True)

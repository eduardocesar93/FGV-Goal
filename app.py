# -*- coding: utf-8 -*-
import os
from flask import Flask, request, redirect, url_for, render_template, flash, current_app, send_from_directory
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'static/images/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif', 'xml', 'xmls', 'txt'])

port = int(os.getenv('VCAP_APP_PORT', 8080))

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
		filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))
            
@app.route("/")
def index():
    return render_template('index.html')

@app.route("/submeter")
def submeter():
    return render_template('submeter.html')

@app.route("/consultar")
def consultar():
    return render_template('consultar.html')
	
@app.route("/questao")
def questao():
	filename = request.args.get('file')
	text = "";
	with open(os.path.join('questions/', filename), 'rb') as file:
		text = file.read()
			
	return text

@app.route("/listarQuestoes")
def listarQuestoes():
	files = []
	for file in os.listdir("questions"):
		if file.endswith(".xml"):
			files.append(file)
	
	text = "<ul class='files'>"
	for file in files:
		text += ("<li>" + file + "  <a href='questao?file="+ file + "' class='consulta'>Consultar</a> | <a href='download?file=" + file + "' download='" + file + "'> Download</a></li>")
	text += "</ul>"
	
	return text
	
@app.route('/upload', methods=['POST'])
def upload():
	state = "danger"
	message = "Um erro ocorreu ao fazer Upload do arquivo"
	
	if 'file' in request.files:
		file = request.files['file'] 
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			state = "success"
			message = "A questão foi salva com sucesso"
	if 'question' in request.files:
			file = request.files['question']
			if file and allowed_file(file.filename):
				filename = secure_filename(file.filename)
				file.save(os.path.join('questions/', filename))
				state = "success"
				message = "A questão foi salva com sucesso"
				flash(message, state)
				return redirect(url_for('submeter'))
	
	flash(message, state)
	return redirect(url_for('submeter'))

@app.route('/download')
def download():
    file = request.args.get('file')
    dir = os.path.join(current_app.root_path, 'questions/')
    return send_from_directory(directory=dir, filename=file)

if __name__ == "__main__":
	app.secret_key = 'FGV-EMAP 13410 Selva'
	app.config['SESSION_TYPE'] = 'filesystem'
	app.run(host='0.0.0.0', port=port)
	
CONTEÚDO DESSE ARQUIVO
----------------------
   
 * Introdução
 * XML
 * Recomedações

INTRODUÇÃO
----------
   
Um padrão para montagem de arquivos foi estabelicido para auxiliar a manutenção de um baco de questões colaborativo inspirado no GOAL - Gradiance On-Line Accelerated Learning http://www.newgradiance.com/downloads/auth-guide.pdf

XML
---

O XML é uma linguagem de marcação flexível usados para atribuir explicitamente significado ou formatação a arquivos de texto. Mais informações podem ser encontradas nas seguintes fontes:

 * w3school http://www.w3schools.com/xml/xml_whatis.asp
 
 * outro site com tutoriais http://www.xmlfiles.com/xml
 
As tags e seus respectivos atributos, que usaremos na produção das questões, futuramente definidas em um Xml Schema são:
 
 * question: tag raiz do documento.
 
	- level: inteiro de 1 a 3, indicando em de forma crescente a dificuldade da questão.
	
	- subject: string qualquer indiciando o assunto relativo à questão.
    
    - id: indetificador único para a questão.
	
 * text: uma área de texto, que pode estar no enunciado ou no corpo de uma opção.
 
 * choice: opção da questão.
 
	- type: string (correct ou incorrect), indicando se a opção está correta ou não.
		
 * explanation: explicação para uma determinada opção estar correta ou falsa.
 
 * tags html: qualquer tag html pode ser utilizada para formatação do texto.
  
RECOMENDAÇÕES
-------------

Um esquema será futuramente definido para validações dos arquivos xml, a fim de que as recomendações abaixo sejam atendidas. 

 * As tags text explanation e option, devem ser filhas de question.
 
 * As tags html podem se localizar em qualquer lugar do arquivo.
 
 * Devem haver ao menos 5 opções, pelo menos 4 opções incorretas e pelo menos 1 correta.
 
 * O atributo correct de option é obrigatório e deve se restringir aos valores 'correct' e 'incorrect'.
 
 * Para a criação das questões e respostas deve seguir as sugestões do GOAL.
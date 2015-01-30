//add as a dependency: http://mimic-xmlrpc.sourceforge.net/
// API: http://trac.opensubtitles.org/projects/opensubtitles/wiki/XMLRPC#SearchSubtitles

var token = "";

function login()
{
	var loginRequest= new XmlRpcRequest("http://api.opensubtitles.org/xml-rpc", "LogIn");
	loginRequest.params = (['', '', 'eng', 'OSTestUserAgent']);
	var response = loginRequest.send();
	token = String(response.parseXML().token);
}


/*

params: 
	sublanguageid - The ISO639 language code (like: pob, eng)
	moviehash - teh SHA1 hash of the file
	moviebytesize - The size of the file that will be searched
	imdbid - The Internet Movie Database ID
	query - movie name
	season - season number
	episode - episode number
	tag - the name of the file


Example:

params = [{
	'query' : 'south park', 
    'season' : 1, 
    'episode' : 1, 
    'sublanguageid':'all',
    'imdbid' : '1129442', 
}];

params = [{
    'query' : 'matrix', 
    'sublanguageid' : 'cze,slo,pob,eng',
    'moviehash' : '18379ac9af039390', 
    'moviebytesize' : 366876694,
}]

params = [{
    'sublanguageid': 'pob',
    'moviehash' : '18379ac9af039390', 
    'moviebytesize' : 366876694,
    'tag' : 'heroess01e08.avi'
}]

*/
function ajaxOpenSubtitle(params, limit)
{
	var request, parsedXml;
	
	if(token) 
	{
		var searchRequest = new XmlRpcRequest("http://api.opensubtitles.org/xml-rpc", "SearchSubtitles");

		searchRequest.addParam(token);
		searchRequest.addParam(params);

		if(limit) { searchRequest.addParam([{limit: limit}]); }

		request = searchRequest.send();
		parsedXml = request.parseXML();
	} 
	else 
	{
		console.log("Usuário Não Logado...");
	}

 	return parsedXml;
}

function getServerInfo()
{
	var searchRequest = new XmlRpcRequest("http://api.opensubtitles.org/xml-rpc", "ServerInfo");
	var results = searchRequest.send();
	return results.parseXML();
}

function logoutFromOpenSubtitle() {
	var logoutRequest = new XmlRpcRequest("http://api.opensubtitles.org/xml-rpc", "LogOut");
	logoutRequest.addParam(token);
	var results = logoutRequest.send();
	return results.parseXML();
}

login();




/*
Ler:

http://trac.opensubtitles.org/projects/opensubtitles/wiki/DevReadFirst
http://stackoverflow.com/questions/26424445/opensubtitles-api-searchsubtitles-returns-no-data
http://trac.opensubtitles.org/projects/opensubtitles/wiki/XMLRPC
https://github.com/nwjs/nw.js/wiki/File-dialogs
https://github.com/exebetche/vlsub/blob/master/vlsub.lua

*/
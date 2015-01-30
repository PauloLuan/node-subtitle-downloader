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

array SearchSubtitles( $token,
 
 array(array(

 sublanguageid => $sublanguageid,
 moviehash => $moviehash,
 moviebytesize => $moviesize,
 imdbid ,
 query - movie name,
 season - season number,
 episode - episode number,
 tag - the name of the file ),

array(...)),
 array(limit => 500))




 Example:


params = [{
	
}];
 
   'query' : 'south park', 'season' : 1, 'episode' : 1, 'sublanguageid':'all',
   'imdbid' : '1129442', 'sublanguageid' : 'eng',
   'query' : 'matrix', 'sublanguageid' : 'cze,slo',
   'moviehash' : '18379ac9af039390', 'moviebytesize' : 366876694,
   'tag' : 'heroess01e08.avi', 
,

   'limit' => 100
)

*/
function ajaxOpenSubtitle(queryText, params, limit)
{
	var request, parsedXml;

	var searchRequest = new XmlRpcRequest("http://api.opensubtitles.org/xml-rpc", "SearchSubtitles");

	searchRequest.addParam(token);
	searchRequest.addParam(params);

	if(limit) { searchRequest.addParam([{limit: limit}]); }

	request = searchRequest.send();
	parsedXml = request.parseXML();
	
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
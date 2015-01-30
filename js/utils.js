/*
	Calculates the SHA1 hash of a file.
*/
var getHash = function(filePath) 
{ 
	var pathExists = path.existsSync('/etc')

	if(pathExists) 
	{
		// the file you want to get the hash    
		var fd = fs.createReadStream(filePath);
		var hash = crypto.createHash('sha1');
		hash.setEncoding('hex');

		fd.on('end', function() {
		    hash.end();
		    console.log(hash.read()); // the desired sha1sum
		});

		// read all file and pipe it (write it) to the hash object
		fd.pipe(hash);
	}	

}

/*
	Checks if the file extension is video or not.

	@return boolean
*/
function isVideoFile(file)
{
	var isVideo = false;

	var fileExtension = getFileExtension(file);
	var videoExtensions = ['.3gp2', '.veg', '.aep', '.wp3', '.rms', '.dzm', '.psh', '.sbk', '.wpl', '.usm', '.sfd', '.piv', '.dir', '.trp', '.swf', '.webm', '.wlmp', '.vob', '.m2p', '.mpeg', '.prproj', '.vro', '.bdmv', '.dzt', '.fcp', '.gfp', '.m21', '.mswmm', '.mvp', '.rdb', '.rec', '.rmp', '.rv', '.screenflow', '.swt', '.vcpf', '.viewlet', '.mkv', '.avi', '.3gp', '.scm', '.srt', '.wmv', '.mani', '.meta', '.tp', '.bin', '.bik', '.dzp', '.ts', '.msdvd', '.mob', '.fbr', '.bnp', '.mp4.infovid', '.m4v', '.aepx', '.amc', '.mnv', '.mproj', '.nvc', '.ifo', '.ism', '.amx', '.swi', '.r3d', '.kmv', '.asf', '.hdmov', '.mts', '.pds', '.pac', '.trec', '.vc1', '.wmd', '.wmx', '.bu', '.mmv', '.vp3', '.mov', '.mpg', '.cpi', '.f4v', '.mp4', '.bdm', '.scc', '.gvi', '.3g2', '.dv4', '.stx', '.xvid', '.890', '.avchd', '.dmx', '.roq', '.ttxt', '.wve', '.3mm', '.dnc', '.f4f', '.ivf', '.k3g', '.lsx', '.lvix', '.moff', '.mvc', '.playlist', '.qt', '.spl', '.vcr', '.w32', '.wm', '.dat', '.vp6', '.str', '.dcr', '.flv', '.dcr', '.vgz', '.smv', '.mpeg4', '.yuv', '.camproj', '.divx', '.dvdmedia', '.fcproject', '.ismv', '.ogv', '.otrkey', '.sqz', '.tix', '.clpi', '.dvr', '.dxr', '.f4p', '.fli', '.hdv', '.rsx', '.inp', '.m15', '.dav', '.264', '.rmvb', '.video', '.lrv', '.3gpp', '.mvp', '.aetx', '.db2', '.mod', '.dash', '.sfera', '.ajp', '.rm', '.mxf', '.m2t', '.pmf', '.vpj', '.h264', '.ale', '.avp', '.bsf', '.dmsm', '.dream', '.imovieproj', '.moi', '.smil', '.3p2', '.aaf', '.arcut', '.avb', '.avv', '.bdt3', '.bmc', '.ced', '.cine', '.cip', '.cmmp', '.cmmtpl', '.cmrec', '.cst', '.d2v', '.d3v', '.dce', '.dck', '.dmsd', '.dmss', '.dpa', '.eyetv', '.fbz', '.ffm', '.flc', '.flh', '.fpdx', '.ftc', '.gcs', '.gifv', '.gts', '.hkm', '.imoviemobile', '.imovieproject', '.ircp', '.ismc', '.ivr', '.izz', '.izzy', '.jss', '.jts', '.jtv', '.kdenlive', '.m1pg', '.m21', '.m2ts', '.m2v', '.mgv', '.mj2', '.mk3d', '.mp21', '.mpgindex', '.mpls', '.mpv', '.mse', '.mtv', '.mvd', '.mve', '.mxv', '.ncor', '.nsv', '.nuv', '.ogm', '.ogx', '.photoshow', '.plproj', '.ppj', '.pro', '.prtl', '.pxv', '.qtl', '.qtz', '.rcd', '.rum', '.rvid', '.rvl', '.sdv', '.sedprj', '.seq', '.sfvidcap', '.siv', '.smi', '.smk', '.stl', '.svi', '.tda3mt', '.tivo', '.tod', '.tp0', '.tpd', '.tpr', '.tsp', '.tvlayer', '.tvshow', '.usf', '.vbc', '.vcv', '.vdo', '.vdr', '.vfz', '.vlab', '.vsp', '.wcp', '.wmmp', '.wvx', '.xej', '.xesc', '.xfl', '.xlmv', '.y4m', '.zm1', '.zm2', '.zm3', '.lrec', '.mp4v', '.mpe', '.mys', '.par', '.aqt', '.gom', '.mpv2', '.orv', '.ssm', '.zeg', '.camrec', '.zmv', '.aec', '.box', '.dpg', '.tvs', '.vep', '.rcproject', '.vf', '.60d', '.vid', '.arf', '.dvr-ms', '.bmk', '.edl', '.snagproj', '.dv', '.dv-avi', '.eye', '.mp21', '.pgi', '.rmd', '.thp', '.avs', '.int', '.mp2v', '.scn', '.tdt', '.ismclip', '.m4e', '.mpl', '.avs', '.evo', '.smi', '.vivo', '.asx', '.movie', '.irf', '.axm', '.cmproj', '.dmsd3d', '.dvx', '.ezt', '.mjp', '.mqv', '.mvy', '.prel', '.vp7', '.xel', '.aet', '.anx', '.avc', '.avd', '.awlive', '.axv', '.bdt2', '.bs4', '.bvr', '.byu', '.camv', '.clk', '.cx3', '.ddat', '.dlx', '.dmb', '.dmsm3d', '.exo', '.fbr', '.fcarch', '.ffd', '.flx', '.gvp', '.imovielibrary', '.iva', '.jmv', '.ktn', '.m1v', '.m2a', '.m4u', '.mjpg', '.mpsub', '.mvex', '.osp', '.pns', '.pro4dvd', '.pro5dvd', '.proqc', '.pssd', '.pva', '.qtch', '.qtindex', '.qtm', '.rp', '.rts', '.sbt', '.sml', '.theater', '.tid', '.tvrecording', '.vem', '.vfw', '.vix', '.vs4', '.vse', '.wot', '.yog', '.787', '.mvb', '.ssf', '.mpg2', '.wtv', '.amv', '.mpl', '.xmv', '.dif', '.modd', '.vft', '.vmlt', '.grasp', '.3gpp2', '.moov', '.pvr', '.vmlf', '.am', '.anim', '.bix', '.cel', '.cvc', '.dsy', '.gl', '.ivs', '.lsf', '.m75', '.mpeg1', '.mpf', '.msh', '.nut', '.pjs', '.pmv', '.psb', '.rmd', '.rmv', '.rts', '.scm', '.sec', '.tdx', '.vdx', '.viv'];
	
	for (var i = 0; i < videoExtensions.length; i++) 
	{
		if(fileExtension == videoExtensions[i]) {
			isVideo = true;	
			break;
		} 
	};

	return isVideo;
}

/*
	Return the filename without Path and the extension, for example:

	input: '/a/b/c.html'
	output: 'c'

	@return string
*/
function getFileName(fullPath)
{
	return path.basename(fullPath, path.extname(fullPath));
}

/*
	Returns the file extension, for example:

	input: '/a/b/c.html' or 'c.html'
	output: '.html'

	@return string
*/
function getFileExtension(fileName)
{
	return path.extname(fileName);
}

/*
	Fetch the content of URL, gunzip it and store the results in the specified output Location

	@param url - the subtitle zip url
	@param outputLocation - the folder (with the file name) that will saves the subtitle.
*/	
function downloadSubtitle(url, outputLocation)
{
	var out = fs.createWriteStream(outputLocation);

	console.log("Downloading: ", getFileName(outputLocation));

	request.get(url)
		.on('response', function(response) {
			console.log('Download completed!', response.statusCode, response.headers['content-type']); // 'image/png' 
		})
		.on('error', function(err) {
			console.log('Download error:', err);
		})
		.pipe(zlib.createGunzip())
		.pipe(out);
}
## Node Subtitle Downloader

About the application: 

- Recursively walks through the directories searching for video files in almost every well known format.
- Searches OpenSubtitles.org and fetches the best quality subs available.
- Downloads subtitles and places them along with the video file itself.

## How to run 

### Installing NODEJS

You must have to use [nodejs](http://nodejs.org/) version 0.10.x. If you not have node on your machine, just put the following code into your terminal as a root (assuming that you're using Linux), it will install and configure the NodeJS by the [NVM (Node Version Manager)](https://github.com/creationix/nvm)

	# log as sudo
	sudo su

	# update system
	apt-get update && apt-get upgrade -y
	 
	# download and configure Node Version Manager
	wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash && \
	source /root/.nvm/nvm.sh && \
	nvm install stable && nvm use stable && nvm alias default stable && \
	node -v
	 
	# update your ~/.bashrc
	echo -e '\n# NODEJS configs \nexport NODE_ENV=development \nsource ~/.nvm/nvm.sh' >> ~/.bashrc && source ~/.bashrc


### Install Node-Webkit dependencie as a global app:
	
	npm install -g nw

### Install the project dependencies:

	npm install

### run the program! :)

	nw .
#! /bin/bash
#发布脚本

#脚本参数
NOW_PATH=$(pwd)
#本地参数
TAGS_PATH="git@github.com:35mmjs/Bookstore.git"
ENV=""
TAG=""
TOOL="git"

#prod目标服务器参数
PROD_REMOTE_IP="47.96.181.54"
PROD_REMOTE_ACCOUNT="root"
PROD_REMOTE_PATH="/home/bookStore"
PROD_MYSQL_ACCOUNT='admin'
PROD_MYSQL_PASSWORD='BookStore2018@!MYSQL.PROD.ADMIN'

# dev server
DEV_REMOTE_IP="47.96.75.202"
DEV_REMOTE_ACCOUNT="root"
DEV_REMOTE_PATH="/home/bookStore"
DEV_MYSQL_ACCOUNT='root'
DEV_MYSQL_PASSWORD='BookStore2018@!MYSQL.PROD'



# common vars
REMOTE_ACCOUNT="root"
REMOTE_PATH="/home/bookStore"
HTTP_SERVER_ACCOUNT="root"
REMOTE_MYSQL_ACCOUNT=''
REMOTE_MYSQL_PASSWORD=''


prefix="============";
aftfix="============>>>";
usage()
{
	echo "usage: -e <dev|prod> -v <v0.1>";
	echo "tip :: $1";
	exit 1;
}

set_remote_config()
{
	case "$ENV" in
		dev)
			REMOTE_IP=$DEV_REMOTE_IP;
			REMOTE_ACCOUNT=$DEV_REMOTE_ACCOUNT;
			REMOTE_PATH=$DEV_REMOTE_PATH;
			REMOTE_MYSQL_ACCOUNT=${DEV_MYSQL_ACCOUNT};
			REMOTE_MYSQL_PASSWORD=${DEV_MYSQL_PASSWORD};
		;;
		prod)
			REMOTE_IP=$PROD_REMOTE_IP;
			REMOTE_ACCOUNT=$PROD_REMOTE_ACCOUNT;
			REMOTE_PATH=$PROD_REMOTE_PATH;
			REMOTE_MYSQL_ACCOUNT=${PROD_MYSQL_ACCOUNT};
			REMOTE_MYSQL_PASSWORD=${PROD_MYSQL_PASSWORD};
    ;;
		test);;
		*) usage "invalid EVN , Please change it in the deploy.sh/set_remote_server";;
	esac;
}

do_deploy()
{
	#打包
	prepare_tar

	#用户自修改
	modify_deploy

	#确认发布
	last_check
  #部署到远程
  before_depoly
	# 开启服务器
	run_server
}

prepare_tar()
{
	#检查文件
	DATE=$(date '+%Y%m%d%H%M%S')
	tmpPath="temp/"$TAG"_"$DATE
  mkdir -p $tmpPath;
  cd $tmpPath;
  git clone $TAGS_PATH ./;
  git checkout stable
  # git init;
  # git remote add origin $TAGS_PATH;
  # git pull origin master && git fetch --tags &
  # loop_process $prefix"git check out from $TAGS_PATH/$TAG"$aftfix;
  # git checkout -b $TAG;
  # loop_process $prefix"build dist"$aftfix;
  # echo $prefix"build dist"$aftfix;
	# npm run build
  rm .git -rf;
	cd $NOW_PATH

	#压缩文件
	cd $NOW_PATH;
	PACKAGE="${TAG}"_"${DATE}.tgz";
	mkdir -p "output"
	cd "temp"
	tar czvf "../output/"$PACKAGE $TAG"_"$DATE> /dev/null &
	cd $NOW_PATH
	loop_process "compressed file"
	#删除打包文件
}

last_check()
{
	echo;
	echo $prefix"deploy list::"$aftfix
	echo $TAGS_PATH|gawk '{printf "%-17s => %-s\n","tag路径",$1}';
	echo $TAG|gawk '{printf "%-19s => %-s\n","tag",$1}';
	echo $ENV|gawk '{printf "%-15s => %-s\n","发布环境",$1}';
	echo $REMOTE_IP|gawk '{printf "%-14s => %-s\n","远程服务器IP",$1}';
	echo $REMOTE_ACCOUNT|gawk '{printf "%-13s => %-s\n","发布使用账户",$1}';
	echo $REMOTE_PATH|gawk '{printf "%-15s => %-s\n","远程路径",$1}';
	echo $HTTP_SERVER_ACCOUNT|gawk '{printf "%-15s => %-s\n","http服务账户",$1}';
	echo;
}

before_depoly()
{
	echo;
	echo $prefix"post to remote service"$aftfix;
	ssh $REMOTE_ACCOUNT@$REMOTE_IP "mkdir -p $REMOTE_PATH"
	scp "output/"$PACKAGE $REMOTE_ACCOUNT@$REMOTE_IP:$REMOTE_PATH/$PACKAGE
	ssh $REMOTE_ACCOUNT@$REMOTE_IP "cd $REMOTE_PATH; tar zxvf $PACKAGE --strip-components 1 >> /dev/null "
	ssh $REMOTE_ACCOUNT@$REMOTE_IP "cd $REMOTE_PATH; rm $REMOTE_PATH/$PACKAGE;chown -R $HTTP_SERVER_ACCOUNT:$HTTP_SERVER_ACCOUNT ./"
}

run_server()
{
	#[修改]根据不同框架进行修改
	echo;
	echo $prefix"run server:"$aftfix;
	# check node env
	# ssh $REMOTE_ACCOUNT@$REMOTE_IP "cd $REMOTE_PATH; /root/.nvm/versions/node/v10.13.0/bin/npm run egg-start"
	# 环境需要提前放置到 .bashrc 当中
	ssh $REMOTE_ACCOUNT@$REMOTE_IP "cd $REMOTE_PATH; npm run build && npm run server"
	return 0
}

modify_deploy()
{
	echo;
	echo $prefix"User-defined changes:"$aftfix;
}


loop_process()
{
	echo;
	echo $1;
	while [ 1 ]
	do
		job=$(jobs | gawk '!/Running/{print 0}')
		if [ "$job" == "0" ];
		then
			break;
		fi
		echo -e "..\c";
		sleep 0.5
	done
	echo;
}

##===================##
#说明：
#1：建议至少在脚本中配置(避免每次发布都带上参数)：TAGS_PATH 、TOOL
#2：并且在set_remote_server\set_remote_path中配置不同环境的:REMOTE_IP、REMOTE_ACCOUNT、REMOTE_PATH、HTTP_SERVER_ACCOUNT
#usage:: ./deploy.sh -e test -v 20170504-1658-export-finance-for-admin -b torrent
##==================##

#接收用户输入参数
while getopts p:e:b:t:v: opt
do
	case "$opt" in
		p)TAGS_PATH=${OPTARG};;
		e)ENV=${OPTARG};;
		b)BUSINESS=${OPTARG};;
		v)TAG=${OPTARG};;
		t)TOOL=${OPTARG};;
		*);;
	esac;
done;

#设置服务器连接方式和变量
set_remote_config

#发布
do_deploy

if [ $? -eq 0 ]
then
	echo "deploy success";
else
	echo "deploy failed";
fi

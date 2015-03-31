/* SIMPLE NODEJS implementation of ACEITA FACIL API */

AceitaFacil.SANDBOXMODE=1;
AceitaFacil.PRODUCTIONMODE=2;
exports.AceitaFacil = AceitaFacil;

var request = require('request');
var querystring = require("querystring");

var AceitaFacil = function(att) {

	if(att.mode==null || att.id==null || att.secret==null){
		console.log("Missing params to init this object");
		return null;
	}
	
	var id= att.id,
	secret= att.secret,
	mode=att.mode;

	var urlMode="";
	if(mode==1)
		urlMode= "https://sandbox.api.aceitafacil.com";
	else
		urlMode= "https://api.aceitafacil.com";
	

	var addCard =function(args, onResponse){

		request(
	    { method: 'POST'
	    ,auth:{
		    'user': id,
		    'pass': secret,
		    'sendImmediately': false
		  }
	    , uri: urlMode + "/card"
	    , body: JSON.stringify(args)
	    , headers: {'content-type' : 'application/json'}
	    }
	  	,onResponse);
	};

	var getCard =function(args, onResponse){

		request(
	    { method: 'GET'
	    ,auth:{
		    'user': id,
		    'pass': secret,
		    'sendImmediately': false
		  }
	    , uri: urlMode + "/card"
	    , body: JSON.stringify(args)
	    , headers: {'content-type' : 'application/json'}
	    }
	  	,onResponse);
	};

	var addVendor =function(){
		return {params:params};
		
	};
	var addItem =function(){
		return {params:params};
		
	};
	var makePayment =function(args, onResponse){
		request(
	    { method: 'POST'
	    ,auth:{
		    'user': id,
		    'pass': secret,
		    'sendImmediately': false
		  }
	    , uri: urlMode + "/payment"
	    , body: JSON.stringify(args)
	    , headers: {'content-type' : 'application/json'}
	    }
	  	,onResponse);
		
	};
	return {
		addCard:addCard,
		getCard:getCard,
		makePayment:makePayment
	}
};
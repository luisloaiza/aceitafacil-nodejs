/* SIMPLE NODEJS implementation of ACEITA FACIL API */


/*

	$client = new \AceitaFacil\Client($is_sandbox = false, $mock_adapter = null);

$client->init($username, $password);

$client->saveCard(\AceitaFacil\Entity\Customer $customer, \AceitaFacil\Entity\Card $card);

$client->getAllCards($customer_id);

$client->deleteCard(\AceitaFacil\Entity\Customer $customer, $token);

$client->makePayment(\AceitaFacil\Entity\Entity\Customer $customer, $items, $description, \AceitaFacil\Entity\Entity\Card $card = null);

$client->getPayment($payment_id);

$client->getVendor($vendor_id);

$client->createVendor(\AceitaFacil\Entity\Entity\Vendor $vendor);

$client->updateVendor(\AceitaFacil\Entity\Entity\Vendor $vendor);

$client->getPaymentItemInfo($payment_id, $item_id);

$client->updatePaymentItemInfo($payment_id, \AceitaFacil\Entity\Entity\Item $item);

*/
var request = require('request');
var querystring = require("querystring");
// user 'c96888b3e29f405c2b4af052c1aa290af8510272'
// pass '6541988c989bbb1a0a2c5b82f7c21910edc11b63'
var AceitaFacil = function(att) {

	if(att.mode==null || att.id==null || att.secret==null){
		console.log("Missing params for instantiate this object");
		return null;
	}
	//for (var attrname in att) { this[attrname]=att[attrname]; }
	var id= att.id,
	secret= att.secret,
	mode=att.mode;

	var urlMode="";
	if(mode==1)
		urlMode= "https://sandbox.api.aceitafacil.com";
	else
		urlMode= "https://api.aceitafacil.com";
	
	
	////POST /card
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
	//GET /card
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
	/*
	card[token] - Recebido via /card
	card[cvv] - Código de segurança atrás do cartão. - Deve vir do cliente, não pode ser armazenado em hipótese alguma.
	boleto[due_date] - Data de vencimento do boleto, no formato YYYY-MM-DD. Se não fornecido, a data é calculada para 5 dias após o dia de hoje.
	customer[id] - ID do cliente
	customer[name] - Nome do cliente
	customer[email] - Email do cliente
	customer[email_language] - Idioma do email (case-insensitive) entre os seguintes: pt-BR (padrão), EN, ES
	description - Descrição do pagamento
	item[0][amount] - Valor do item (mesmo formato do total_amount)
	item[0][vendor_id] - ID do vendedor
	item[0][vendor_name] - Nome do vendedor
	item[0][fee_split] - Peso para divisão da tarifa entre os recebedores (veja calculadora)
	item[0][description] - Descrição do item
	item[0][trigger_lock] - Se “true”, o pagamento não será entregue ao vendedor (até que essa flag seja alterada para “false”)
	item[1]... - Quantos items quiser
	paymentmethod[id] - Pode ser 1 para cartão de crédito (é o padrão) ou 2 para boleto.
	total_amount - Valor total, inteiro representando os centavos (R$ 12,34 → 1234)
	*/
	//POST https://sandbox.api.aceitafacil.com/payment
	var makePayment =function(args, onResponse){
		
		//console.log("making payment with: "+JSON.stringify(args));

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

	// Define which variables and methods can be accessed
	return {
		addCard:addCard,
		getCard:getCard,
		makePayment:makePayment
	}

	//return this;
};

AceitaFacil.SANDBOXMODE=1;
AceitaFacil.PRODUCTIONMODE=2;

exports.AceitaFacil = AceitaFacil;

/*
exports.requestAPI = function(params,fnSuccess){
	
	var paramString = JSON.stringify(params);

	var data = querystring.stringify({data:paramString});
	console.log("data  "+data);
	var options = {
	  host: apiURL,
	  port: 80,
	  path: "/prive/?"+data,
	  method: 'GET',
	
	};
	var request=http.request(options, function(resa) {
		
		resa.setEncoding("utf8");
		var responseString = '';

 		resa.on('data', function(d) {
 			responseString += d;
		});
		
        resa.on("end", function () {
        	console.log("getting string "+responseString);
			fnSuccess(JSON.parse(responseString),null);
        });
			
	});
	
	request.on('error', function(e) {
	  	console.log("Got error in request API JIGL: " + e.message);
		fnSuccess(null,e);
	});
	
	request.on('uncaughtException', function(e) {
	  	console.log("Caught exception: " + e);
		fnSuccess(null,e);
	});
	
	request.end();
}



*/


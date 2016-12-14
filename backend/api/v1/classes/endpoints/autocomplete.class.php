<?php
/**
 * Created by PhpStorm.
 * User: iyudin
 * Date: 13.12.2016
 * Time: 17:28
 */
require_once 'EndpointAbstract.class.php';
class Endpoint extends EndpointAbstract
{
    public function processAPI()
    {
	    $this->api->exitIfUnauthorized();
	    switch ($this->api->verb) {
		    case 'products':
			    return $this->searchProduct();
			    break;
	    }
    }

	//Выполняем запрос GET /autocomplete/products?text=...
	private function searchProduct() {
    	$search = $this->api->args['text'].'%';
		$rs = $this->api->db->prepare("
			SELECT *
			FROM products_catalog
			WHERE title LIKE ?");
		$rs->execute(array($search));
		$product = $rs->fetchAll(PDO::FETCH_ASSOC);
		return $product;
	}
}
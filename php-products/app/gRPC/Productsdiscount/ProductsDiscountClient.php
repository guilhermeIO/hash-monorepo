<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Productsdiscount;

/**
 */
class ProductsDiscountClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * @param \Productsdiscount\ApplyRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function Apply(\Productsdiscount\ApplyRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/productsdiscount.ProductsDiscount/Apply',
        $argument,
        ['\Productsdiscount\ApplyResponse', 'decode'],
        $metadata, $options);
    }

}

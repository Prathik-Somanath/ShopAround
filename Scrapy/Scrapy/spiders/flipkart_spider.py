# -*- coding: utf-8 -*-
import scrapy
from ..items import ScrapyItem

class FlipkartSpiderSpider(scrapy.Spider):
    name = 'flipkart'
    allowed_domains = ['flipkart.com']
    start_urls = [
        'https://www.flipkart.com/laptops/~asus-gaming-laptops21/pr?sid=6bo%2Cb5g&wid=4.productCard.PMU_V2_4'
        ]

    def parse(self, response):
        items = ScrapyItem()
        bad_chars = ['₹', ','];
        product_name = response.css('._3wU53n::text').extract()
        product_price = response.css('._2rQ-NK::text').extract()
        product_imagelink = response.css('._1Nyybr::attr(src)').getall()
        product_url = response.css('._31qSD5::attr(href)').extract()
        

        items['product_name'] = product_name
        items['product_price'] = product_price
        items['product_imagelink'] = product_imagelink
        items['product_url'] = product_url
        yield items

        # next_page = response.css('._3fVaIS::attr(href)').get()

        # if next_page is not None:
        #     yield response.follow(next_page, callback=self.parse)

        

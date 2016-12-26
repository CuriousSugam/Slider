var sliders = [];
var Slider = function(sliderWrapperId){
	
	this.thumbnails_wrapper = document.getElementById(sliderWrapperId).children['thumbnails-wrapper'];

	this.ul = document.getElementById(sliderWrapperId).children[0];
	this.li = this.ul.children;
	this.index = 0;
	this.ul.style.width = this.li[0].clientWidth * this.li.length;

	this.thumbnail = this.thumbnails_wrapper.children;

	//  5px * no. of thumbnails extra width due to default margin
	this.thumbnails_wrapper.style.width = this.thumbnail[0].width * this.thumbnail.length + 5*this.thumbnail.length;
	this.thumbnail_left_margin = this.thumbnail[0].width;
	
	this.interval;
	var that = this;
	document.getElementById(sliderWrapperId).children['prev'].addEventListener('click', this.prevClickHandler.bind(that));
	document.getElementById(sliderWrapperId).children['next'].addEventListener('click', this.nextClickHandler.bind(that));
	sliders.push(this);


	var elements = this.thumbnails_wrapper.children;
	for(var i = 0; i < elements.length; i++){
		this.goToIndex(elements[i], i);				
	}

}

Slider.prototype = {
	start: function(){
		var that = this;
		this.interval = setInterval(this.slideImages.bind(that) , 2000);
	},
	slideImages: function(){
		this.index++;
		if(this.index > this.li.length-1){
			this.index = 0;
		}
		this.ul.style.left = '-'+this.index * 100 +'%';
		this.changeThumbnailOpacity(this.index);
		this.slideThumbnail();
	},
	slideThumbnail: function(){
		var thumbnail_width = this.thumbnail[0].width;	
		var current_thumbnail_width = thumbnail_width * (this.index + 1);
		var wrapper_width = this.li[0].clientWidth - thumbnail_width;	
		if( current_thumbnail_width >= wrapper_width){
			this.thumbnails_wrapper.style.left = '-' + (this.thumbnail_left_margin + thumbnail_width) + 'px';
			this.thumbnail_left_margin += thumbnail_width;
		}else{
			this.thumbnails_wrapper.style.left = '0px';
		}
		if(this.index == 0){
			this.thumbnail_left_margin = thumbnail_width;
		}
	},
	goTo: function(sliderIndex){
		var that = this;
		this.changeThumbnailOpacity(sliderIndex);
		if(sliderIndex < 0 || sliderIndex > this.li.length -1)
			return
		this.index = sliderIndex;		
		clearInterval(this.interval);
		this.ul.style.left = '-'+ (this.index) * 100 +'%';
		this.interval = setInterval(this.slideImages.bind(that), 2000);		
	},
	goToPrev: function() {
      this.goTo(--this.index)
    },
    goToNext: function() {
      this.goTo(++this.index)
    },
    prevClickHandler: function(){
    	this.goToPrev(this.index - 1);
    },
    nextClickHandler: function(){
    	this.goToNext(this.index + 1);
    },
    goToIndex: function (element, i){
    	var that = this;
		element.addEventListener('click', function(){
				 this.goTo(i);
			}.bind(that), false);	
	},
	changeThumbnailOpacity: function(sliderIndex){
		for(var i = 0; i < this.thumbnail.length; i++){
			element = this.thumbnail[i];
			element.className = 'thumbnail';
		};
		if(sliderIndex >=0 && sliderIndex < this.thumbnail.length){
			this.thumbnail[sliderIndex].setAttribute('class', 'active');	
		}
		
	}
}




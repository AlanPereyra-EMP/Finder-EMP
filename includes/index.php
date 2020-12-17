<?php
function add_femp_script(){
  $src = plugins_url( 'includes/js/femp.js', __DIR__ );
  wp_enqueue_script( 'femp_js', $src);
  wp_register_script( 'femp_js', $src );
}
function add_femp_styles(){
  $src = plugins_url( 'includes/css/femp.css', __DIR__ );
  wp_enqueue_style( 'femp_css', $src);
  wp_register_style( 'femp_css', $src );
}

// Php url images to JS variables using WP Enqueue script
function php_variables_javascript() { ?>
	<script type="text/javascript" >
		var fempUrlTarget = '<?php echo plugins_url( 'includes/images/target.svg', __DIR__ ); ?>';
    var fempUrlStartAudio = '<?php echo plugins_url( 'includes/sounds/WoodPlankFlicks.mp3', __DIR__ ); ?>';
    var fempUrlNextAudio = '<?php echo plugins_url( 'includes/sounds/MetallicClank.mp3', __DIR__ ); ?>';
		var fempUrlWinAudio = '<?php echo plugins_url( 'includes/sounds/456966__funwithsound__success-fanfare-trumpets.mp3', __DIR__ ); ?>';

		var fempImgs = 4;//Defines the amount of images that the plugin includes
		var url = '<?php echo plugins_url( 'includes/images/no-target', __DIR__ ); ?>';
		var fempUrlNoTarget = [];

		for(var i = 0; i<= fempImgs; i++){
			fempUrlNoTarget[i] = url + '-' + i + '.svg';
		}
	</script> <?php
}
?>

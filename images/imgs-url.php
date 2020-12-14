<?php
// Php url images to JS variables using WP Enqueue script
function my_action_javascript() { ?>
	<script type="text/javascript" >
		var fempUrlTarget = '<?php echo plugins_url( 'images/target.png', __DIR__ ); ?>';

		var fempImgs = 4;//Defines the amount of images that the plugin includes
		var url = '<?php echo plugins_url( 'images/no-target', __DIR__ ); ?>';
		var fempUrlNoTarget = [];

		for(var i = 0; i<= fempImgs; i++){
			fempUrlNoTarget[i] = url + '-' + i + '.png';
		}
	</script> <?php
}
?>

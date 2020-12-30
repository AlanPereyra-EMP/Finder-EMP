<?php
$src = plugins_url( 'includes/js/config.js', __DIR__ );
wp_register_script( 'femp_config_js', $src );
function add_femp_config_script(){
  wp_enqueue_script( 'femp_config_js', $src);
}
$src = plugins_url( 'includes/js/files.js', __DIR__ );
wp_register_script( 'femp_files_js', $src );
function add_femp_files_script(){
  wp_enqueue_script( 'femp_files_js', $src);
}
$src = plugins_url( 'includes/js/counter.js', __DIR__ );
wp_register_script( 'femp_counter_js', $src );
function add_femp_counter_script(){
  wp_enqueue_script( 'femp_counter_js', $src);
}
$src = plugins_url( 'includes/js/send-result.js', __DIR__ );
wp_register_script( 'femp_send_js', $src );
function add_femp_send_script(){
  wp_enqueue_script( 'femp_send_js', $src);
}
$src = plugins_url( 'includes/js/femp.js', __DIR__ );
wp_register_script( 'femp_js', $src );
function add_femp_script(){
  wp_enqueue_script( 'femp_js', $src);
}
$src = plugins_url( 'includes/css/femp.css', __DIR__ );
wp_register_style( 'femp_css', $src );
function add_femp_styles(){
  wp_enqueue_style( 'femp_css', $src);
}

// Add Ajax support
wp_localize_script('femp_send_js', 'fempAjax', [
  'url' => admin_url('admin-ajax.php')
]);
wp_localize_script('femp_js', 'fempAjax', [
  'url' => admin_url('admin-ajax.php')
]);

// Php url images to JS variables using WP Enqueue script
function php_url_javascript() { ?>
	<script type="text/javascript" >
    var fempUrl = '<?php echo plugins_url('', __DIR__ ); ?>';
	</script> <?php
}
?>

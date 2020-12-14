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
?>

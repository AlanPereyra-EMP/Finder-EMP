<?php
// "[Femp]" shortcode

if(!shortcode_exists('femp')) {

  function femp_shortcode($atts) {
    // Enqueue all Js and Css included above
    add_action( 'wp_enqueue_scripts', 'my_action_javascript' );
    add_action('wp_enqueue_scripts','add_femp_styles');
    add_action('wp_enqueue_scripts','add_femp_script');

    $h2 = '<h2 class="text-center">Título de ejemplo</h2>';

    $canvas = '<canvas id="femp-bg" width="300" height="300"></canvas>';

    $counter = '<p class="text-center h3">00:00:00</p>';

    return $h2.
           $canvas.
           $counter;
  }
  add_shortcode('femp', 'femp_shortcode');
}


?>

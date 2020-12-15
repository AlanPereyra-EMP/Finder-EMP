<?php
// "[Femp]" shortcode

if(!shortcode_exists('femp')) {

  function femp_shortcode($atts) {
    // Enqueue all Js and Css included above
    add_action( 'wp_enqueue_scripts', 'php_variables_javascript' );
    add_action('wp_enqueue_scripts','add_femp_styles');
    add_action('wp_enqueue_scripts','add_femp_script');

    // Adaptative width
    if(wp_is_mobile()){
      $canvas_width = 300;
      $canvas_height = 400;
    }else{
      $canvas_width = 600;
      $canvas_height = 300;
    }

    $canvas = '<canvas id="femp-bg" width="'.$canvas_width.'" height="'.$canvas_height.'"></canvas>';


    $counter = '<p id="femp-counter">00:00:00</p>';

    return $canvas.
           $counter;
  }
  add_shortcode('femp', 'femp_shortcode');
}


?>

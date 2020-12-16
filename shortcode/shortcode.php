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

    $canvas = '<canvas id="femp-bg" class="faded" style="opacity:0;" width="'.$canvas_width.'" height="'.$canvas_height.'"></canvas>';


    $counter = '<p id="femp-counter">00:00:00</p>';

    return '<div id="femp-page" class="femp-fade-in">
              <div id="femp-div">'.
                $canvas.
                $counter.
              '</div>
            </div>';
  }
  add_shortcode('femp', 'femp_shortcode');
}


?>

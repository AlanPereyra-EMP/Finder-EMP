<?php
// "[Femp]" shortcode

if(!shortcode_exists('femp')) {

  function femp_shortcode($atts) {
    // Enqueue all Js and Css included above
    add_action('wp_enqueue_scripts','php_url_javascript', 7, 1);
    add_action('wp_enqueue_scripts','add_femp_config_script', 10, 1);
    add_action('wp_enqueue_scripts','add_femp_files_script', 8, 1);
    add_action('wp_enqueue_scripts','add_femp_counter_script', 9, 1);
    add_action('wp_enqueue_scripts','add_femp_send_script', 9, 1);
    add_action('wp_enqueue_scripts','add_femp_script', 10, 1);
    add_action('wp_enqueue_scripts','add_femp_styles');

    // Adaptative width
    if(wp_is_mobile()){
      $canvas_width = 300;
      $canvas_height = 350;
    }else{
      $canvas_width = 700;
      $canvas_height = 400;
    }

    $title = '<h2>Finder EMP</h2>';

    $canvas = '<canvas id="femp-bg" class="femp-fade-in" width="'.$canvas_width.'" height="'.$canvas_height.'"></canvas>';

    $form = '<div id="femp-form-div"></div>';

    $counter = '<div id="femp-counter" class="femp-fade-in">
                  <p id="femp-counter-p">
                    <span id="femp-min"></span>:<span id="femp-sec"></span>:<span id="femp-mili"></span>
                  </p>
                  <div>
                    <p id="femp-remaining-p">Faltan: <span id="femp-remaining"></span></p>
                    <p>Toques: <span id="femp-touch"></span></p>
                  </div>
                </div>';

    return '<div style="height:100vh;"></div>
            <div id="femp-page" class="femp-fade-in">
              <div id="femp-div">'.
                $title.
                $canvas.
                $form.
                $counter.
              '</div>
            </div>';
  }
  add_shortcode('femp', 'femp_shortcode');
}
?>

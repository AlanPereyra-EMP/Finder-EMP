<?php
// "[Femp]" shortcode

if(!shortcode_exists('femp')) {

  function femp_shortcode($atts) {
    // Enqueue all Js and Css included above
    add_action( 'wp_enqueue_scripts', 'php_variables_javascript' );
    add_action( 'wp_enqueue_scripts', 'php_atrubutes_javascript' );
    add_action('wp_enqueue_scripts','add_femp_styles');
    add_action('wp_enqueue_scripts','add_femp_script');

    // Atributes
  	$atributes = shortcode_atts( array(
      'levels' => '10',
      'counter' => 'asc'
    ), $atts );

    // Save shortcode atributes values on JS variables
    $levels = $atributes['levels'];
    function php_atrubutes_javascript() {
    ?>
    	<script type="text/javascript">
        var fempLevels = '<?php echo $levels ?>';
        console.log(fempLevels);
      </script>
    <?php }

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

    $counter = '<div id="femp-counter" class="femp-fade-in">
                  <div>
                    <p>Faltan: '.$levels.'</p>
                    <p>Toques: <span id="femp-touch"></span></p>
                  </div>
                  <p>00:00:00</p>
                </div>';

    return '<div style="height:100vh;"></div>
            <div id="femp-page" class="femp-fade-in">
              <div id="femp-div">'.
                $title.
                $canvas.
                $counter.
              '</div>
            </div>';
  }
  add_shortcode('femp', 'femp_shortcode');
}


?>

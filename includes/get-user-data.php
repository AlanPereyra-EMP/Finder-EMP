<?php
add_action('wp_ajax_nopriv_femp_send_data', 'femp_get_data');
add_action('wp_ajax_femp_send_data', 'femp_get_data');
add_action('wp_ajax_nopriv_femp_top5', 'femp_top5');
add_action('wp_ajax_femp_top5', 'femp_top5');


function femp_get_data(){
  $name = $_POST['name'];
  $contact = $_POST['contact'];
  $touches = $_POST['touches'];
  $time = $_POST['time'];
  $chrono = $_POST['chrono'];

  if(($name != '')&&($contact != '')){

    global $wpdb;

    $table = $wpdb->prefix.'femp';

    $data = array(
      'name' => $name,
      'contact' => $contact,
      'touches' => $touches,
      'time' => $time,
      'chrono' => $chrono
    );

    $format = array(
      '%s','%s','%d','%s','%d'
    );

    $wpdb->insert($table,$data,$format);

    // Do send top five table results
    $top5 = $wpdb->get_results(
      "
      SELECT * FROM $table ORDER BY $table.`chrono` ASC
      "
    );

    echo json_encode($top5);
    die();
  }
}

function femp_top5(){
  // Do send top five table results
  global $wpdb;

  $table = $wpdb->prefix.'femp';

  $top5 = $wpdb->get_results(
    "
    SELECT * FROM $table ORDER BY $table.`chrono` ASC
    "
  );

  echo json_encode($top5);
  die();
}
?>

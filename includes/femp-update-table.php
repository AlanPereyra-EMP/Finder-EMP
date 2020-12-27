<?php
function femp_update(){
  global $wpdb;
  $installed_ver = get_option( "femp_db_version" );

  if ( $installed_ver != $femp_db_version ) {

    $table_name = $wpdb->prefix . 'femp';

    $sql = "CREATE TABLE $table_name (
      id mediumint(9) NOT NULL AUTO_INCREMENT,
  		name varchar(60) NOT NULL,
  		dni int(8),
      touches int(100) NOT NULL,
      chrono int(6) NOT NULL,
  		PRIMARY KEY  (id)
    );";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sql );

    update_option( "femp_db_version", $femp_db_version );
  }
}

function femp_update_db_check() {
  global $femp_db_version;
  if ( get_site_option( 'femp_db_version' ) != $femp_db_version ) {
    femp_update();
  }
}
add_action( 'plugins_loaded', 'femp_update_db_check' );
?>

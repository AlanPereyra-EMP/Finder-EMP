<?php

$femp_db_version = '1.3';

function femp_install() {
	global $wpdb;
	global $femp_db_version;

	$table_name = $wpdb->prefix . 'femp';

	$charset_collate = $wpdb->get_charset_collate();

  $sql = "CREATE TABLE $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    name varchar(60) NOT NULL,
    contact varchar(50),
    touches int(3) NOT NULL,
    chrono int(6) NOT NULL,
    PRIMARY KEY  (id)
  ) $charset_collate;";

  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
  dbDelta( $sql );

  add_option( 'femp_db_version', $femp_db_version );
}
register_activation_hook( __FILE__, 'femp_install' );


function femp_db_check() {
	global $wpdb;
	global $femp_db_version;

	$query = $wpdb->prepare( 'SHOW TABLES LIKE %s', $wpdb->esc_like( $table_name ) );
  if ( (! $wpdb->get_var( $query ) == $table_name)||($femp_db_version !== get_option('femp_db_version'))) {
    femp_install();
  }
}
add_action( 'plugins_loaded', 'femp_db_check' );

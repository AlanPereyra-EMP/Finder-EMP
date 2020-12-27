<?php

global $femp_db_version;
$femp_db_version = '1.0';

function femp_install() {
	global $wpdb;
	global $femp_db_version;

	$table_name = $wpdb->prefix . 'femp';

	$charset_collate = $wpdb->get_charset_collate();

  $sql = "CREATE TABLE IF NOT EXISTS $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    name varchar(60) NOT NULL,
    dni int(8),
    touches int(100) NOT NULL,
    chrono int(6) NOT NULL,
    PRIMARY KEY  (id)
  ) $charset_collate;";

  require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
  dbDelta( $sql );

  add_option( 'femp_db_version', $femp_db_version );
}

register_activation_hook( __FILE__, 'femp_install' );

<?php
function femp_update_db_check() {
  global $femp_db_version;
  if ( get_site_option( 'femp_db_version' ) != $femp_db_version ) {
    femp_update();
  }
}
add_action( 'plugins_loaded', 'femp_update_db_check' );
?>

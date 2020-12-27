<?php
/*
Plugin Name: Finder EMP
Plugin URI: https://empralidad.com.ar/finder-emp
Description: Finder EMP es un plugin para WordPress que añade un minijuego de búsqueda mediante un shortcode.
Author: Empralidad
Author URI: https://empralidad.com.ar/
Text Domain: femp
License: GPLv2 or later
Version: 1.0.0
*/
if ( ! defined( 'ABSPATH' ) ){
	exit;
}


require_once plugin_dir_path(__FILE__).'/includes/index.php';
require_once plugin_dir_path(__FILE__).'/includes/get-user-data.php';
require_once plugin_dir_path(__FILE__).'/includes/femp-table.php';
require_once plugin_dir_path(__FILE__).'/shortcode/shortcode.php';
?>

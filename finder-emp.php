<?php
/*
Plugin Name: Finder EMP
Plugin URI: https://empralidad.com.ar/finder-emp
Description: Finder EMP es un plugin para WordPress que añade un minijuego de búsqueda mediante un shortcode.
Author: Empralidad
Author URI: https://empralidad.com.ar/
Text Domain: femp
License: GPLv2 or later
Version: 0.1.1
*/
if ( ! defined( 'ABSPATH' ) ){
	exit;
}

include plugin_dir_path(__FILE__).'/includes/index.php';
include plugin_dir_path(__FILE__).'/shortcode/shortcode.php';
?>

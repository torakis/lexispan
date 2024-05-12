<?php
/**
 * Astra functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Astra
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


function add_custom_class($classes) {
// new-testament<br />
if ( is_page( '914')  || is_page('271') || is_page('233') || is_page('281'))
$classes[] = 'hideScrollbar';
return $classes;
}
add_filter('body_class','add_custom_class');

function my_theme_scripts() {
	if(!is_admin()){
		wp_enqueue_script('custom-control',
			get_stylesheet_directory_uri() . '/js/control.js',
			array('jquery'));
	}
}
add_action( 'wp_enqueue_scripts', 'my_theme_scripts' );

function url_attributes() {
    ?>
    <script type="text/javascript">
		//new testament
		if(window.location.href.includes("new-testament")){
			if(!window.location.href.includes("/?")){
				jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/G1.html");	
				history.pushState({}, null, `?G1`);
			}
			else{
				var G = window.location.href.split('/?')[1];
				jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/"+G+'.html',
					function(data,textStatus) {
						if (textStatus == "error") {
						   history.pushState({}, null, `?G1`);							
						   jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/G1.html");							
						   document.getElementById("overlay").style.display = "block";
						   jQuery("#text").load("/wp-content/themes/astra/update.html");
						   alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
						   return;
						};
					 	history.pushState({}, null, `?${G}`);
						var parser = new DOMParser();
						var htmlDoc = parser.parseFromString(data, 'text/html');
						lemma = htmlDoc.querySelector("p:nth-child(2)").innerText;
						jQuery("#strongNum").val(G);
						jQuery("#lemma").val(lemma);
				  	});
			}
			jQuery("#strongLemma").load("/wp-content/themes/astra/strongLemma/A.html");
		}
		//old testament
		else if(window.location.href.includes("old-testament")){
			if(!window.location.href.includes("/?")){
				jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/G10001.html");	
				history.pushState({}, null, `?G10001`);
			}
			else{
				var G = window.location.href.split('/?')[1];
				jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/"+G+'.html',
					function(data,textStatus) {
						if (textStatus == "error") {
						   history.pushState({}, null, `?G10001`);							
						   jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/G10001.html");							
						   document.getElementById("overlay").style.display = "block";
						   jQuery("#text").load("/wp-content/themes/astra/update_old.html");
						   alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
						   return;
						};
					 	history.pushState({}, null, `?${G}`);
						var parser = new DOMParser();
						var htmlDoc = parser.parseFromString(data, 'text/html');
						lemma = htmlDoc.querySelector("p:nth-child(2)").innerText;
						jQuery("#strongNum").val(G);
						jQuery("#lemma").val(lemma);
				  	});
			}
			jQuery("#strongLemma").load("/wp-content/themes/astra/strongLemmaOld/A.html");
		}
		//search
		else if(window.location.href.includes("search")){
			if(!window.location.href.includes("/?")){
				jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/G1.html");	
				history.pushState({}, null, `?G1`);
			}
			else{
				var G = window.location.href.split('/?')[1];
				jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/"+G+'.html',
					function(data,textStatus) {
						if (textStatus == "error") {								
						   history.pushState({}, null, `?G1`);
						   jQuery("#Gfile").load("/wp-content/themes/astra/gFiles/G1.html");	
						   alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
						   return;
						};
					 	history.pushState({}, null, `?${G}`);
						var parser = new DOMParser();
						var htmlDoc = parser.parseFromString(data, 'text/html');
						lemma = htmlDoc.querySelector("p:nth-child(2)").innerText;
						jQuery("#strongNum").val(G);
						jQuery("#lemma").val(lemma);
				  	});
			}
		}
		//gTables
		else if(window.location.href.includes("tables")){
			//previous was a gFile
			if(document.referrer.split("/").includes("new-testament")){
				var G = document.referrer.split('/?')[1];
				jQuery("#Gtable").load("/wp-content/themes/astra/gTables/"+G+"tbl.html",
					function(data,textStatus) {               
				    if (textStatus == "error") {
						alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
					  	return;
				    }
					else{
						history.pushState({}, null, `?${G}`);
						var parser = new DOMParser();
						var htmlDoc = parser.parseFromString(data, 'text/html');
						lemma = htmlDoc.querySelector("font:nth-child(2)").innerText;
						jQuery("#strongNum").val(G);
						jQuery("#lemma").val(lemma);
					};               
				});
				
			}
			//if it contains no arguments
			else if(!window.location.href.includes("/?")){
				history.pushState({}, null, `?G1`);
				jQuery("#Gtable").load("/wp-content/themes/astra/gTables/G1tbl.html");
				jQuery("#strongNum").val("G1");
				jQuery("#lemma").val("Α, α");
			}
			//if it contains an argument or previous was another gTable and search was clicked
			else if(window.location.href.includes('/?')||document.referrer.includes("tables")){
				var G = window.location.href.split('/?')[1];
				jQuery("#Gtable").load("/wp-content/themes/astra/gTables/"+G+"tbl.html",
					function(data,textStatus) {
						if (textStatus == "error") {								
						   history.pushState({}, null, `?G1`);
						   jQuery("#Gtable").load("/wp-content/themes/astra/gTables/G1tbl.html");	
						   alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
						   return;
						   jQuery("#strongNum").val("G1");
						   jQuery("#lemma").val("Α, α");
						}
					    else{
							var parser = new DOMParser();
							var htmlDoc = parser.parseFromString(data, 'text/html');
							lemma = htmlDoc.querySelector("font:nth-child(2)").innerText;
							jQuery("#strongNum").val(G);
							jQuery("#lemma").val(lemma);
						}
					});						
			}			
			else{
				jQuery("#Gtable").load("/wp-content/themes/astra/gTables/G1tbl.html",
					function(data,textStatus) {
						if (textStatus == "error") {								
						   history.pushState({}, null, `?G1`);
						   jQuery("#Gtable").load("/wp-content/themes/astra/gTables/G1tbl.html");	
						   alert("Το λήμμα δεν έχει προστεθεί ακόμα.");
						   return;
						}
					});	
				history.pushState({}, null, `?G1`);	
				jQuery("#strongNum").val("G1");	
				jQuery("#lemma").val("Α, α");
			}
		}
		//bible
		else if(window.location.href.includes("bible")){
			if(!window.location.href.includes('/?')){
				jQuery("#verses").load("/wp-content/themes/astra/bible/B1tbl.html");	
				history.pushState({}, null, `?B1`);
			}
			else{
				var Bfile = window.location.href.split('/?')[1];
				jQuery("#verses").load("/wp-content/themes/astra/bible/"+Bfile+'tbl.html');
				jQuery("#book").val(localStorage.getItem("book"));

				var file="chapters/"+localStorage.getItem("book") + ".txt";
   				
				jQuery("#chapter").load("/wp-content/themes/astra/bible/"+file);

				//load selected chapter
				jQuery.get("/wp-content/themes/astra/bible/"+file, 
				function(data) {
					var res = localStorage.getItem("chapter");
					jQuery("#chapter option[value="+res+"]").attr('selected','selected');
				}, 'text');				   
			}
		}
	</script>
    <?php
}
add_action('wp_footer', url_attributes);



/**
 * Define Constants
 */
define( 'ASTRA_THEME_VERSION', '2.5.5' );
define( 'ASTRA_THEME_SETTINGS', 'astra-settings' );
define( 'ASTRA_THEME_DIR', trailingslashit( get_template_directory() ) );
define( 'ASTRA_THEME_URI', trailingslashit( esc_url( get_template_directory_uri() ) ) );

define('DISABLE_CACHE', true);

/**
 * Minimum Version requirement of the Astra Pro addon.
 * This constant will be used to display the notice asking user to update the Astra addon to latest version.
 */
define( 'ASTRA_EXT_MIN_VER', '2.6.0' );

/**
 * Setup helper functions of Astra.
 */
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-theme-options.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-theme-strings.php';
require_once ASTRA_THEME_DIR . 'inc/core/common-functions.php';

/**
 * Update theme
 */
require_once ASTRA_THEME_DIR . 'inc/theme-update/class-astra-theme-update.php';
require_once ASTRA_THEME_DIR . 'inc/theme-update/astra-update-functions.php';
require_once ASTRA_THEME_DIR . 'inc/theme-update/class-astra-theme-background-updater.php';
require_once ASTRA_THEME_DIR . 'inc/theme-update/class-astra-pb-compatibility.php';


/**
 * Fonts Files
 */
require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-font-families.php';
if ( is_admin() ) {
	require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-fonts-data.php';
}

require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-fonts.php';

require_once ASTRA_THEME_DIR . 'inc/core/class-astra-walker-page.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-enqueue-scripts.php';
require_once ASTRA_THEME_DIR . 'inc/core/class-gutenberg-editor-css.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-dynamic-css.php';

/**
 * Custom template tags for this theme.
 */
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-attr.php';
require_once ASTRA_THEME_DIR . 'inc/template-tags.php';

require_once ASTRA_THEME_DIR . 'inc/widgets.php';
require_once ASTRA_THEME_DIR . 'inc/core/theme-hooks.php';
require_once ASTRA_THEME_DIR . 'inc/admin-functions.php';
require_once ASTRA_THEME_DIR . 'inc/core/sidebar-manager.php';

/**
 * Markup Functions
 */
require_once ASTRA_THEME_DIR . 'inc/markup-extras.php';
require_once ASTRA_THEME_DIR . 'inc/extras.php';
require_once ASTRA_THEME_DIR . 'inc/blog/blog-config.php';
require_once ASTRA_THEME_DIR . 'inc/blog/blog.php';
require_once ASTRA_THEME_DIR . 'inc/blog/single-blog.php';
/**
 * Markup Files
 */
require_once ASTRA_THEME_DIR . 'inc/template-parts.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-loop.php';
require_once ASTRA_THEME_DIR . 'inc/class-astra-mobile-header.php';

/**
 * Functions and definitions.
 */
require_once ASTRA_THEME_DIR . 'inc/class-astra-after-setup-theme.php';

// Required files.
require_once ASTRA_THEME_DIR . 'inc/core/class-astra-admin-helper.php';

require_once ASTRA_THEME_DIR . 'inc/schema/class-astra-schema.php';

if ( is_admin() ) {

	/**
	 * Admin Menu Settings
	 */
	require_once ASTRA_THEME_DIR . 'inc/core/class-astra-admin-settings.php';
	require_once ASTRA_THEME_DIR . 'inc/lib/notices/class-astra-notices.php';

	/**
	 * Metabox additions.
	 */
	require_once ASTRA_THEME_DIR . 'inc/metabox/class-astra-meta-boxes.php';
}

require_once ASTRA_THEME_DIR . 'inc/metabox/class-astra-meta-box-operations.php';


/**
 * Customizer additions.
 */
require_once ASTRA_THEME_DIR . 'inc/customizer/class-astra-customizer.php';


/**
 * Compatibility
 */
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-jetpack.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/woocommerce/class-astra-woocommerce.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/edd/class-astra-edd.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/lifterlms/class-astra-lifterlms.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/learndash/class-astra-learndash.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-beaver-builder.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-bb-ultimate-addon.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-contact-form-7.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-visual-composer.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-site-origin.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-gravity-forms.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-bne-flyout.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-ubermeu.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-divi-builder.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-amp.php';
require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-yoast-seo.php';
require_once ASTRA_THEME_DIR . 'inc/addons/transparent-header/class-astra-ext-transparent-header.php';
require_once ASTRA_THEME_DIR . 'inc/addons/breadcrumbs/class-astra-breadcrumbs.php';
require_once ASTRA_THEME_DIR . 'inc/addons/heading-colors/class-astra-heading-colors.php';

// Elementor Compatibility requires PHP 5.4 for namespaces.
if ( version_compare( PHP_VERSION, '5.4', '>=' ) ) {
	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-elementor.php';
	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-elementor-pro.php';
}

// Beaver Themer compatibility requires PHP 5.3 for anonymus functions.
if ( version_compare( PHP_VERSION, '5.3', '>=' ) ) {
	require_once ASTRA_THEME_DIR . 'inc/compatibility/class-astra-beaver-themer.php';
}

/**
 * Load deprecated functions
 */
require_once ASTRA_THEME_DIR . 'inc/core/deprecated/deprecated-filters.php';
require_once ASTRA_THEME_DIR . 'inc/core/deprecated/deprecated-hooks.php';
require_once ASTRA_THEME_DIR . 'inc/core/deprecated/deprecated-functions.php';
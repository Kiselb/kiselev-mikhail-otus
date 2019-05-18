		function getPath(element) {



			var css_selector = "";

			if (typeof element === undefined) {

				return "";

			}

			if (element.parentElement === document.documentElement) {


				return "body";


			}

			var parent_element = element.parentElement;
	
			for(var i = 0; i < parent_element.children.length; i++) {
				if (element === parent_element.children[i]) {
			
		css_selector = getPath(parent_element) + " > :nth-child(" + (i + 1).toString() + ")";
				}
			}

			return css_selector;

		};


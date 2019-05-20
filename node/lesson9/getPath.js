		function getPath(element) {

			var origin_element = element;
			var css_selector = "";

			if (typeof element === undefined) {

				return undefined;

			}
			if (element instanceof HTMLBodyElement) {

				return "body";

			}
			if (element instanceof HTMLElement) {

				if (typeof element.id.length > 0) {

					return "#" + element.id;

				}

				var is_element = true;

				while(is_element) {

					var parent_element = origin_element.parentElement;

					for(var i = 0; i < parent_element.children.length; i++) {
						if (origin_element === parent_element.children[i]) {
							css_selector = " > :nth-child(" + (i + 1).toString() + ")" + css_selector;
							break;
						}
					}

					origin_element = parent_element;
					is_element = !(parent_element instanceof HTMLBodyElement);
				}

				css_selector = "body " + css_selector

				return css_selector;

			}

			return undefined;

		};



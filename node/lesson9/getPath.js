		function getPath(element) {

			var origin_element = element;
			var css_selector = "";

			if (element instanceof HTMLBodyElement) {

				return "body";

			}
			if (element instanceof HTMLElement) {

				if (element.id) {

					return "#" + element.id;

				}

				while(!(origin_element instanceof HTMLBodyElement)) {

					var index = [].indexOf.call(origin_element.parentElement.children, origin_element);
					css_selector = " > :nth-child(" + (index + 1).toString() + ")" + css_selector;

					origin_element = origin_element.parentElement;
				}

				css_selector = "body " + css_selector

				return css_selector;

			}

			return undefined;

		};



module.exports.dir = function(origin_path) {

	if (typeof origin_path === 'string') {
		if (origin_path.length === 0) {
			return { folders: [], files: []};
		}
		if (origin_path.charAt(origin_path.length - 1) !== '/') {
			origin_path += '/';
		}
		if (fs.existsSync(origin_path)) { // async version: fs.exists() - deprecated. Subsequental calls are asynchrous
			TreeBuild(origin_path);
		} else {
			return { folders: [], files: []};
		}
	} else {
		return { folders: [], files: []};
	}
}

const fs = require('fs');

if (require.main === module) { // run from CLI

	let origin_path = process.argv[2];

	if (typeof origin_path === 'string') {
		if (origin_path.length > 0) {
			if (origin_path.charAt(origin_path.length - 1) !== '/') {
				origin_path += '/';
			}
			if (fs.existsSync(origin_path)) { // async version: fs.exists() - deprecated. Subsequental calls are asynchrous
				TreeBuild(origin_path);
			} else {
				process.exit(0);
			}
		} else {
			process.exit(0);
		}
	} else {
		process.exit(0);
	}
}

function TreeBuild(origin) {

	var result = { files: [], folders: [] };
	var exit_flag = 0;

	function TreeBuildOrigin(err, files) {

		for(let i = 0; i < files.length; i++) {

			if (files[i].isDirectory()) {

				result.folders.push(files[i].name);

				TreeBuildNode(origin, files[i].name + '/')

			} else if (files[i].isFile()) {

				result.files.push(files[i].name);

			} else {



			}
		}
	}

	function TreeBuildNode(origin, path) {

		exit_flag++;

		fs.readdir(origin + path, { encoding: 'UTF-8', withFileTypes: true}, (err, files) => {

			exit_flag--;

			for(let i = 0; i < files.length; i++) {

				if (files[i].isDirectory()) {

					result.folders.push(path + files[i].name);

					TreeBuildNode(origin, path + files[i].name + '/', files[i].name)

				} else if (files[i].isFile()) {

					result.files.push(path + files[i].name);

				} else {



				}
			}

			if (exit_flag === 0) {

				result.folders.sort();
				result.files.sort();

				if (require.main === module) {

					for(let i = 0; i < result.folders.length; i++) {
						console.log(result.folders[i])
					}

					for(let i = 0; i < result.files.length; i++) {
						console.log(result.files[i])
					}
					process.exit(0);
				} else {
					return result;
				}
			}
		});

	}

	fs.readdir(origin, { encoding: 'UTF-8', withFileTypes: true}, TreeBuildOrigin);

}

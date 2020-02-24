function jsonFix(iString) {
	return iString.substring(iString.indexOf("// JSON START"), iString.indexOf("// JSON END"));
}
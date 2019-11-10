all: clean dependencies package

clean:
	rm -rf dist/

dirs:
	mkdir -p dist/

dependencies: dirs
	cp package.json dist/
	cp package-lock.json dist/
	cd dist && npm install --only=production

install-code: dirs
	cp index.js dist/index.js
	cp root.crt dist/root.crt

package: dirs install-code
	rm -f dist.zip
	cd dist && zip -r ../dist.zip ./*

.PHONY: clean dirs dependencies install-code package all
webpackJsonp([1,4],{

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Artist; });
var Artist = (function () {
    function Artist() {
    }
    return Artist;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/artist.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_artist__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_category__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objects_config__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_js_base64__ = __webpack_require__(678);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_js_base64___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_js_base64__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtistService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ArtistService = (function () {
    function ArtistService(http) {
        this.http = http;
        this.artistsUrl = 'app/artists';
    }
    ArtistService.prototype.getArtists = function () {
        return this.http
            .get(this.artistsUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    ArtistService.prototype.getFeaturedArtists = function () {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].artist + '/get_featured_artists')
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    ArtistService.prototype.getLocalArtist = function (id) {
        return this.getArtists().then(function (artists) { return artists.find(function (artist) { return artist.id === id; }); });
    };
    ArtistService.prototype.getArtistName = function (id) {
        return this.getLocalArtist(id).then(function (artist) { return artist.name; });
    };
    ArtistService.prototype.constructMusicbrainzArtist = function (artist) {
        var id = artist.id;
        var name = encodeURIComponent(artist.name);
        var params = "/" + id + "/" + name;
        console.log(__WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].artist + '/get_mb_artist' + params);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].artist + '/get_mb_artist' + params)
            .toPromise()
            .then(function (res) {
            console.log(res.json());
            return res.json();
        })
            .catch(this.handleError);
    };
    ArtistService.prototype.constructDbpediaArtist = function (artist) {
        var artist_uri = __WEBPACK_IMPORTED_MODULE_7_js_base64__["Base64"].encode(artist.dbpedia_uri);
        var name = encodeURIComponent(artist.name);
        var params = "/" + artist_uri + "/" + name;
        console.log(__WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].artist + '/get_dbp_artist' + params);
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].artist + '/get_dbp_artist' + params)
            .toPromise()
            .then(function (res) {
            console.log(res.json());
            return res.json();
        })
            .catch(this.handleError);
    };
    ArtistService.prototype.getImage = function (id) {
        var param = "/" + id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].wikidata + '/get_reduced_image' + param)
            .toPromise()
            .then(function (res) {
            var response = res.json();
            var artist = new __WEBPACK_IMPORTED_MODULE_2__objects_artist__["a" /* Artist */]();
            artist.image = "./" + response.local_uri;
            if ("original_uri" in response)
                artist.original_image = response.original_uri;
            if ("entity_id" in response)
                artist.entity_id = response.entity_id;
            return artist;
        })
            .catch(this.handleError);
    };
    ArtistService.prototype.getCategoryLinks = function (category, artist, limit) {
        var yago_uri = __WEBPACK_IMPORTED_MODULE_7_js_base64__["Base64"].encode(category.uri);
        var artist_uri = __WEBPACK_IMPORTED_MODULE_7_js_base64__["Base64"].encode(artist.dbpedia_uri);
        var params = "/" + yago_uri + "/" + artist_uri + "/" + limit;
        var uri = __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].dbpedia + '/get_category_links' + params;
        return this.http.get(uri)
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    ArtistService.prototype.getAcousticbrainzLinks = function (artist) {
        var param = "/" + artist.id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].artist + '/get_acousticbrainz_artists' + param)
            .toPromise()
            .then(function (res) {
            if (Array.isArray(res.json()))
                return res.json();
            else
                return [];
        })
            .catch(this.handleError);
    };
    ArtistService.prototype.getMoodplayLinks = function (artist, limit) {
        var param = "/" + artist.id;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].artist + '/get_moodplay_artists' + param)
            .toPromise()
            .then(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    ArtistService.prototype.getLastFMLinks = function (artist) {
        var name = encodeURIComponent(artist.name);
        var id = artist.id;
        var params = "/" + id + "/" + name;
        return this.http.get(__WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].lastfm + '/get_similar_artists' + params)
            .toPromise()
            .then(function (res) {
            var json = res.json();
            var category = new __WEBPACK_IMPORTED_MODULE_3__objects_category__["a" /* Category */]();
            if (json.length > 0) {
                category.label = "Last.FM Similar Artists";
                category.parent = artist;
                category.artists = json;
            }
            return category;
        })
            .catch(this.handleError);
    };
    ArtistService.prototype.getMusicbrainzID = function (artist) {
        var artist_uri = __WEBPACK_IMPORTED_MODULE_7_js_base64__["Base64"].encode(artist.dbpedia_uri);
        var artist_name = encodeURIComponent(artist.name);
        var params = "/" + artist_uri + "/" + artist_name;
        var uri = __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].server + __WEBPACK_IMPORTED_MODULE_4__objects_config__["a" /* Config */].sameas + '/find_musicbrainz_id' + params;
        return this.http.get(uri)
            .toPromise()
            .then(function (res) {
            var artist = res.json();
            return artist;
        })
            .catch(this.handleError);
    };
    ArtistService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ArtistService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], ArtistService);
    return ArtistService;
    var _a;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/artist.service.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
var Config = {
    server: "https://musiclynx-api.herokuapp.com",
    wikidata: "/wikidata",
    dbpedia: "/dbpedia",
    mb: "/musicbrainz",
    sameas: "/sameas",
    acousticbrainz: "/acousticbrainz",
    moodplay: "/moodplay",
    lastfm: "/lastfm",
    artist: "/artist"
};
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/config.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
var Category = (function () {
    function Category() {
    }
    return Category;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/category.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_artist__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_config__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MusicBrainzService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MusicBrainzService = (function () {
    function MusicBrainzService(http) {
        this.http = http;
    }
    MusicBrainzService.prototype.getArtists = function (searchTerm) {
        var _this = this;
        searchTerm = encodeURIComponent(searchTerm);
        this.url = __WEBPACK_IMPORTED_MODULE_3__objects_config__["a" /* Config */].server + ("/musicbrainz/artist_search/" + searchTerm);
        return this.http.request(this.url, { headers: this.headers })
            .toPromise()
            .then(function (res) {
            var artist_search_result = res.json()["artists"];
            _this.artists = new Array();
            for (var _i = 0, artist_search_result_1 = artist_search_result; _i < artist_search_result_1.length; _i++) {
                var item = artist_search_result_1[_i];
                var artist = new __WEBPACK_IMPORTED_MODULE_2__objects_artist__["a" /* Artist */]();
                artist.id = item.id;
                artist.name = item.name;
                artist.score = +item.score;
                artist.disambiguation = item.disambiguation ? item.disambiguation : "";
                _this.artists.push(artist);
            }
            return _this.artists;
        }).catch(this.handleError);
    };
    MusicBrainzService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    MusicBrainzService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], MusicBrainzService);
    return MusicBrainzService;
    var _a;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/musicbrainz.service.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_config__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YouTubeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YouTubeService = (function () {
    function YouTubeService(http) {
        this.http = http;
    }
    YouTubeService.prototype.getVideos = function (searchTerm) {
        var _this = this;
        searchTerm = encodeURIComponent(searchTerm);
        this.url = __WEBPACK_IMPORTED_MODULE_2__objects_config__["a" /* Config */].server + ("/youtube/search_videos/" + searchTerm);
        return this.http.get(this.url)
            .toPromise()
            .then(function (res) {
            _this.videos = res.json();
            return _this.videos;
        }).catch(this.handleError);
    };
    YouTubeService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    YouTubeService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === 'function' && _a) || Object])
    ], YouTubeService);
    return YouTubeService;
    var _a;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/youtube.service.js.map

/***/ }),

/***/ 393:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 393;


/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_modules_app_module__ = __webpack_require__(518);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_modules_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/main.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'MusicLynx';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: "\n  <nav>\n    <a routerLink=\"/dashboard\" routerLinkActive=\"active\">{{title}}</a>\n  </nav>\n  <router-outlet></router-outlet>\n  ",
            styles: [__webpack_require__(680)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/app.component.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_musicbrainz_service__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_artist_service__ = __webpack_require__(107);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtistSearchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ArtistSearchComponent = (function () {
    function ArtistSearchComponent(musicbrainzService, artistService, router) {
        this.musicbrainzService = musicbrainzService;
        this.artistService = artistService;
        this.router = router;
        this.searchTerms = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
    }
    ArtistSearchComponent.prototype.search = function (term) {
        var _this = this;
        // Push a search term into the observable stream.
        this.artists = [];
        this.musicbrainzService.getArtists(term)
            .then(function (artists) { return _this.artists = artists; })
            .catch(function (error) {
            // TODO: real error handling
            console.log("Error in component ... " + error);
            return [];
        });
    };
    ArtistSearchComponent.prototype.suggest = function (term) { };
    ArtistSearchComponent.prototype.gotoDetail = function (artist) {
        var link = ['/artist', artist.id, artist.name];
        this.router.navigate(link);
    };
    ArtistSearchComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'artist-search',
            template: __webpack_require__(687),
            styles: [__webpack_require__(681)],
            providers: [__WEBPACK_IMPORTED_MODULE_3__services_musicbrainz_service__["a" /* MusicBrainzService */], __WEBPACK_IMPORTED_MODULE_4__services_artist_service__["a" /* ArtistService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_musicbrainz_service__["a" /* MusicBrainzService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_musicbrainz_service__["a" /* MusicBrainzService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_artist_service__["a" /* ArtistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_artist_service__["a" /* ArtistService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _c) || Object])
    ], ArtistSearchComponent);
    return ArtistSearchComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/artist-search.component.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_artist__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_artist_service__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_youtube_service__ = __webpack_require__(337);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtistComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MAX_ARTISTS = 30;
var ArtistComponent = (function () {
    function ArtistComponent(artistService, youTubeService, route) {
        this.artistService = artistService;
        this.youTubeService = youTubeService;
        this.route = route;
    }
    ArtistComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.artist = new __WEBPACK_IMPORTED_MODULE_2__objects_artist__["a" /* Artist */]();
            if (params['id'] && params['name']) {
                _this.artist.name = params['name'];
                if (params['id'].search("http") == -1) {
                    _this.artist.id = params['id'];
                    console.log("Getting MusicBrainz artist");
                    _this.getMBArtist();
                }
                else {
                    _this.artist.dbpedia_uri = params['id'];
                    console.log("Getting Dbpedia artist");
                    _this.getDBPArtist();
                }
            }
            else {
                window.history.back();
            }
        });
    };
    ArtistComponent.prototype.getMBArtist = function () {
        var _this = this;
        this.artistService.constructMusicbrainzArtist(this.artist).then(function (artist) {
            _this.displayArtist(artist);
        }).catch(function (reason) {
            console.log(reason);
        });
    };
    ArtistComponent.prototype.getDBPArtist = function () {
        var _this = this;
        this.artistService.constructDbpediaArtist(this.artist).then(function (artist) {
            _this.displayArtist(artist);
        }).catch(function (reason) {
            console.log(reason);
        });
    };
    ArtistComponent.prototype.displayArtist = function (artist) {
        this.artist = artist;
        if (artist.id)
            this.getAcousticbrainzCategories();
        if (artist.name)
            this.getMoodplayLinks();
    };
    ArtistComponent.prototype.getImage = function () {
        var _this = this;
        this.artistService.getImage(this.artist.id)
            .then(function (artist) {
            _this.artist.image = artist.image;
            if (artist.original_image)
                _this.artist.original_image = artist.original_image;
            if (artist.entity_id)
                _this.artist.entity_id = artist.entity_id;
        });
    };
    ArtistComponent.prototype.getAcousticbrainzCategories = function () {
        var _this = this;
        this.artistService.getAcousticbrainzLinks(this.artist)
            .then(function (response) {
            _this.ab_categories = response;
        });
    };
    ArtistComponent.prototype.getMoodplayLinks = function () {
        var _this = this;
        this.artistService.getMoodplayLinks(this.artist, MAX_ARTISTS)
            .then(function (response) {
            if (response.label)
                _this.mood_category = response;
        });
    };
    ArtistComponent.prototype.getLastFMLinks = function () {
        var _this = this;
        this.artistService.getLastFMLinks(this.artist)
            .then(function (response) {
            if (response.label)
                _this.lastfm_category = response;
        });
    };
    // showAssociatedArtists(): void {
    //   this.associated_artists = {
    //     label: "Associated Artists",
    //     parent: this.artist,
    //     artists: this.artist.associated_artists
    //   } as Category;
    // }
    //
    ArtistComponent.prototype.getVideos = function () {
        var _this = this;
        this.youTubeService.getVideos(this.artist.name)
            .then(function (response) {
            _this.videos = response;
        });
    };
    ArtistComponent.prototype.goBack = function () {
        window.history.back();
    };
    ArtistComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'artist-detail',
            template: __webpack_require__(688),
            styles: [__webpack_require__(682)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_artist_service__["a" /* ArtistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_artist_service__["a" /* ArtistService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_youtube_service__["a" /* YouTubeService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_youtube_service__["a" /* YouTubeService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _c) || Object])
    ], ArtistComponent);
    return ArtistComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/artist.component.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(77);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { SpotifyService } from 'angular2-spotify';
var AudioComponent = (function () {
    function AudioComponent(
        //    private spotifyService: SpotifyService,
        sanitizer, route) {
        this.sanitizer = sanitizer;
        this.route = route;
        this._player_html = "https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=400&height=350&color=007FEB&layout=dark&size=medium&type=playlist";
    }
    Object.defineProperty(AudioComponent.prototype, "setArtist", {
        set: function (artist_id) {
            this._artist_id = artist_id;
            this._player_frame = this.sanitizer.bypassSecurityTrustResourceUrl(this._player_html + "&id=artist-" + this._artist_id + "&app_id=1");
            // console.log(this._player_frame);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], AudioComponent.prototype, "setArtist", null);
    AudioComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'deezer-playlist',
            template: __webpack_require__(689),
            styles: [__webpack_require__(683)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], AudioComponent);
    return AudioComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/audio.component.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_artist__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_category__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_artist_service__ = __webpack_require__(107);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MAX_LINKS = 30;
var CategoryComponent = (function () {
    function CategoryComponent(artistService, router) {
        this.artistService = artistService;
        this.router = router;
        this.state = 'hide';
    }
    CategoryComponent.prototype.ngOnInit = function () {
        if (!this._category.artists)
            this.getArtists();
    };
    Object.defineProperty(CategoryComponent.prototype, "setCategory", {
        set: function (category) {
            this._category = category;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryComponent.prototype, "getCategory", {
        get: function () { if (this._category.artists && this._category.artists.length > 0 && this._category.label.indexOf("Albums") == -1)
            return this._category; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryComponent.prototype, "setArtist", {
        set: function (artist) {
            this._artist = artist;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoryComponent.prototype, "getArtist", {
        get: function () { return this._artist; },
        enumerable: true,
        configurable: true
    });
    CategoryComponent.prototype.getArtists = function () {
        var _this = this;
        if (!this._category.artists) {
            this.artistService.getCategoryLinks(this._category, this._artist, MAX_LINKS)
                .then(function (response) {
                _this._category = response;
                _this.state == 'show';
            });
        }
        {
            this.state = (this.state === 'show' ? 'hide' : 'show');
        }
    };
    CategoryComponent.prototype.gotoDetail = function (artist) {
        var link;
        if ("id" in artist) {
            var link_1 = ['/artist', artist.id, artist.name];
            this.router.navigate(link_1);
        }
        else {
            var link_2 = ['/artist', artist.dbpedia_uri, artist.name];
            this.router.navigate(link_2);
        }
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__objects_category__["a" /* Category */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__objects_category__["a" /* Category */]) === 'function' && _a) || Object), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__objects_category__["a" /* Category */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__objects_category__["a" /* Category */]) === 'function' && _b) || Object])
    ], CategoryComponent.prototype, "setCategory", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(), 
        __metadata('design:type', (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__objects_artist__["a" /* Artist */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__objects_artist__["a" /* Artist */]) === 'function' && _c) || Object), 
        __metadata('design:paramtypes', [(typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__objects_artist__["a" /* Artist */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__objects_artist__["a" /* Artist */]) === 'function' && _d) || Object])
    ], CategoryComponent.prototype, "setArtist", null);
    CategoryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'category-links',
            template: __webpack_require__(690),
            styles: [__webpack_require__(684)]
        }), 
        __metadata('design:paramtypes', [(typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__services_artist_service__["a" /* ArtistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_artist_service__["a" /* ArtistService */]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _f) || Object])
    ], CategoryComponent);
    return CategoryComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/category.component.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_artist_service__ = __webpack_require__(107);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DashboardComponent = (function () {
    function DashboardComponent(router, artistService) {
        this.router = router;
        this.artistService = artistService;
        this.artists = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.artistService.getFeaturedArtists()
            .then(function (artists) { return _this.artists = artists; });
    };
    DashboardComponent.prototype.gotoDetail = function (artist) {
        var link = ['/artist', artist.id, artist.name];
        this.router.navigate(link);
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'musiclynx-dashboard',
            template: __webpack_require__(691),
            styles: [__webpack_require__(685)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_artist_service__["a" /* ArtistService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_artist_service__["a" /* ArtistService */]) === 'function' && _b) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/dashboard.component.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_artist__ = __webpack_require__(106);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YouTubeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var YouTubeComponent = (function () {
    function YouTubeComponent(sanitizer, route) {
        this.sanitizer = sanitizer;
        this.route = route;
    }
    Object.defineProperty(YouTubeComponent.prototype, "setArtist", {
        set: function (artist) {
            this._artist = artist;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YouTubeComponent.prototype, "setVideos", {
        set: function (videos) {
            this._videos = videos;
            this._current = videos[0];
            console.log(videos[0].width + "X" + videos[0].height);
            console.log(videos[0].link);
            console.log(videos[0].title);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__objects_artist__["a" /* Artist */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__objects_artist__["a" /* Artist */]) === 'function' && _a) || Object), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__objects_artist__["a" /* Artist */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__objects_artist__["a" /* Artist */]) === 'function' && _b) || Object])
    ], YouTubeComponent.prototype, "setArtist", null);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], YouTubeComponent.prototype, "setVideos", null);
    YouTubeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'youtube-videos',
            template: __webpack_require__(692),
            styles: [__webpack_require__(686)]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _d) || Object])
    ], YouTubeComponent);
    return YouTubeComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/youtube.component.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_app_component__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__routing_module__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_artist_service__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_musicbrainz_service__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_youtube_service__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_artist_search_component__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_category_component__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_youtube_component__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_audio_component__ = __webpack_require__(514);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_5__routing_module__["a" /* AppRoutingModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__components_app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_9__components_artist_search_component__["a" /* ArtistSearchComponent */], __WEBPACK_IMPORTED_MODULE_10__components_category_component__["a" /* CategoryComponent */], __WEBPACK_IMPORTED_MODULE_11__components_youtube_component__["a" /* YouTubeComponent */], __WEBPACK_IMPORTED_MODULE_12__components_audio_component__["a" /* AudioComponent */], __WEBPACK_IMPORTED_MODULE_5__routing_module__["b" /* routedComponents */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6__services_artist_service__["a" /* ArtistService */], __WEBPACK_IMPORTED_MODULE_7__services_musicbrainz_service__["a" /* MusicBrainzService */], __WEBPACK_IMPORTED_MODULE_8__services_youtube_service__["a" /* YouTubeService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__components_app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/app.module.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_dashboard_component__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_artist_component__ = __webpack_require__(513);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routedComponents; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_2__components_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'artist/:id/:name', component: __WEBPACK_IMPORTED_MODULE_3__components_artist_component__["a" /* ArtistComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRoutingModule);
    return AppRoutingModule;
}());
var routedComponents = [__WEBPACK_IMPORTED_MODULE_2__components_dashboard_component__["a" /* DashboardComponent */], __WEBPACK_IMPORTED_MODULE_3__components_artist_component__["a" /* ArtistComponent */]];
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/routing.module.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/alo/dev/musiclynx-ng/src/environment.js.map

/***/ }),

/***/ 680:
/***/ (function(module, exports) {

module.exports = "h1 {\n  font-size: 1.2em;\n  color: #999;\n  color: #555;\n  margin-bottom: 0;\n}\nh2 {\n  font-size: 2em;\n  margin-top: 0;\n  padding-top: 0;\n}\nnav a {\n  padding: 5px 10px;\n  text-decoration: none;\n  margin-top: 10px;\n  display: inline-block;\n  background-color: #eee;\n  border-radius: 4px;\n}\nnav a:visited, a:link {\n  color: #607D8B;\n}\nnav a:hover {\n  color: #039be5;\n  background-color: #CFD8DC;\n}\nnav a.router-link-active {\n  color: #039be5;\n}\n.header-bar {\n  background-color: rgb(0,120,215);\n  height: 4px;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n"

/***/ }),

/***/ 681:
/***/ (function(module, exports) {

module.exports = ".search-result{\n  border-bottom: 1px solid gray;\n  border-left: 1px solid gray;\n  border-right: 1px solid gray;\n  width:195px;\n  height: 20px;\n  padding: 5px;\n  background-color: white;\n  cursor: pointer;\n}\n\n#search-box{\n  width: 200px;\n  height: 20px;\n  border: 1px solid lightgray;\n}\n\n.selected {\n  background-color: #CFD8DC !important;\n  color: white;\n}\n.artists {\n  margin: 0 0 2em 0;\n  list-style-type: none;\n  padding: 0;\n  width: 30em;\n}\n.artists li {\n  cursor: pointer;\n  position: relative;\n  left: 0;\n  background-color: #EEE;\n  margin: .5em;\n  padding: .3em 0;\n  height: 1.6em;\n  border-radius: 4px;\n}\n.artists li.selected:hover {\n  background-color: #BBD8DC !important;\n  color: white;\n}\n.artists li:hover {\n  color: #607D8B;\n  background-color: #DDD;\n  left: .1em;\n}\n.artists .text {\n  position: relative;\n  top: -3px;\n}\n.artists .badge {\n  display: inline-block;\n  font-size: small;\n  color: white;\n  padding: 0.8em 0.7em 0 0.7em;\n  background-color: #607D8B;\n  line-height: 1em;\n  position: relative;\n  left: -1px;\n  top: -4px;\n  height: 1.8em;\n  margin-right: .8em;\n  border-radius: 4px 0 0 4px;\n}\n"

/***/ }),

/***/ 682:
/***/ (function(module, exports) {

module.exports = "label {\n  display: inline-block;\n  margin: .5em 0;\n  color: #607D8B;\n  color: rgb(0,120,215);\n  font-weight: bold;\n}\ninput {\n  height: 2em;\n  font-size: 1em;\n  padding-left: .4em;\n}\nbutton {\n  margin-top: 20px;\n  font-family: Arial;\n  background-color: #eee;\n  border: none;\n  padding: 5px 10px;\n  border-radius: 4px;\n  cursor: pointer; cursor: hand;\n}\nbutton:hover {\n  background-color: #cfd8dc;\n}\nbutton:disabled {\n  background-color: #eee;\n  color: #ccc;\n  cursor: auto;\n}\n.mbid{\n  font-size: xx-small;\n}\n.artist_image{\n  display: inline-block;\n}\n.abstract{\n  display: inline-block;\n}\n"

/***/ }),

/***/ 683:
/***/ (function(module, exports) {

module.exports = "#deezer-player{\n  width: 450px;\n  margin-bottom: 10px;\n  float: left;\n  border: 1px solid #999;\n}\n"

/***/ }),

/***/ 684:
/***/ (function(module, exports) {

module.exports = ".contain-category{\n  width: 200px;\n  height: 200px;\n  margin-bottom: 10px;\n  float: left;\n  border: 1px solid #999;\n  margin-right: 20px;\n}\n\n.header{\n  background: #999;\n  color: #ddd;\n  text-transform: uppercase;\n  font-size: 8pt;\n  padding: 5px;\n  min-height: 30px;\n}\n\n.list{\n  overflow-x: hidden;\n  overflow-y: scroll;\n  height: 160px;\n}\n\n.list_item {\n  font-size: 10pt;\n}\n\n.list_item:hover{\n  cursor: pointer;\n  background-color: #eee;\n}\n"

/***/ }),

/***/ 685:
/***/ (function(module, exports) {

module.exports = "[class*='col-'] {\n  float: left;\n}\n*, *:after, *:before {\n\tbox-sizing: border-box;\n}\nh3 {\n  text-align: center; margin-bottom: 0;\n}\n[class*='col-'] {\n  padding-right: 20px;\n  padding-bottom: 20px;\n}\n[class*='col-']:last-of-type {\n  padding-right: 0;\n}\n.grid {\n  margin: 0;\n  display: inline-block;\n}\n.col-1-4 {\n  width: 13%;\n}\n.module {\n\tpadding: 20px;\n\ttext-align: center;\n\tcolor: #eee;\n\tmax-height: 120px;\n\tmin-width: 120px;\n\tborder-radius: 2px;\n  background-size: cover !important;\n  -webkit-text-stroke-width: 1px;\n  -webkit-text-stroke-color: #aaa;\n  opacity: 0.85;\n  filter: alpha(opacity=85);\n}\nh4 {\n  position: relative;\n}\n.module:hover {\n  background-color: #EEE;\n  background-color: #CCC;\n  cursor: pointer;\n  color: #000;\n  -webkit-text-stroke-color: #fff;\n  opacity: 1.0;\n  filter: alpha(opacity=100);\n}\n.grid-pad {\n  padding: 10px 0;\n}\n.grid-pad > [class*='col-']:last-of-type {\n  padding-right: 20px;\n}\n@media (max-width: 600px) {\n\t.module {\n\t  font-size: 10px;\n\t  max-height: 75px;\n  }\n  .col-1-4 {\n    width: 50%;\n  }\n}\n@media (max-width: 1024px) {\n\t.grid {\n\t  margin: 0;\n\t}\n\t.module {\n\t  min-width: 60px;\n\t}\n}\n"

/***/ }),

/***/ 686:
/***/ (function(module, exports) {

module.exports = ".contain-videos{\n  width: 970px;\n  margin-bottom: 10px;\n  float: left;\n  border: 1px solid #999;\n}\n\n.current{\n  padding: 2px;\n  display: inline-block;\n}\n\n.list{\n  overflow-x: hidden;\n  overflow-y: scroll;\n  display: inline-block;\n  max-width: 480px;\n}\n\n.list_item:hover{\n  cursor: pointer;\n  background-color: #eee;\n}\n\n.embed{\n  margin: 2px auto;\n}\n"

/***/ }),

/***/ 687:
/***/ (function(module, exports) {

module.exports = "<div id=\"search-component\">\n  <h4>Artist Search</h4>\n  <input #searchBox id=\"search-box\" (keyup)=\"suggest(searchBox.value)\" />\n  <button (click)=\"search(searchBox.value)\">Search</button>\n  <div>\n    <ul class=\"artists\">\n      <li *ngFor=\"let artist of artists\"\n        [class.selected]=\"artist === selectedArtist\"\n        (click)=\"gotoDetail(artist)\">\n        <span class=\"badge\">{{artist.name}}</span> {{artist.id}}\n      </li>\n    </ul>\n  </div>\n</div>\n"

/***/ }),

/***/ 688:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"artist\">\n  <h2>{{artist.name}}</h2>\n  <div>\n    <div class=\"artist_image\"><img *ngIf=\"artist.image\" [src]=\"artist.image\"></div>\n      <div class=\"abstract\"> {{ artist.abstract }}\n      <div *ngIf=\"artist.wikipedia_uri\"><a [href]=\"artist.wikipedia_uri\">Continue reading at Wikipedia..</a></div>\n    </div>\n  </div>\n  <div class=\"mbid\"><label>Musicbrainz: </label><a [href]=\"'http://musicbrainz.org/artist/'+artist.id\">{{artist.id}}</a></div>\n  <div *ngIf=\"artist.dbpedia_uri\" class=\"mbid\"><label>Dbpedia: </label><a [href]=\"artist.dbpedia_uri\">{{ artist.dbpedia_uri }}</a></div>\n  <category-links *ngIf=\"artist.associated_artists\"\n    [setCategory]=\"artist.associated_artists\"\n    [setArtist]=\"artist\">\n  </category-links>\n  <category-links *ngFor=\"let category of artist.categories\"\n    [setCategory]=\"category\"\n    [setArtist]=\"artist\">\n  </category-links>\n  <category-links *ngFor=\"let category of ab_categories\"\n    [setCategory]=\"category\"\n    [setArtist]=\"artist\">\n  </category-links>\n  <category-links *ngIf=\"mood_category\"\n    [setCategory]=\"mood_category\"\n    [setArtist]=\"artist\">\n  </category-links>\n  <category-links *ngIf=\"lastfm_category\"\n    [setCategory]=\"lastfm_category\"\n    [setArtist]=\"artist\">\n  </category-links>\n  <youtube-videos *ngIf=\"videos\"\n    [setArtist]=\"artist\"\n    [setVideos]=\"videos\">\n  </youtube-videos>\n  <deezer-playlist *ngIf=\"deezer_id\"\n    [setArtist]=\"deezer_id\">\n  </deezer-playlist>\n  <button (click)=\"goBack()\">Back</button>\n</div>\n"

/***/ }),

/***/ 689:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"_artist_id\" id=\"deezer-player\">\n  <iframe scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" [src]=\"_player_frame\" width=\"400\" height=\"350\"></iframe>\n</div>\n"

/***/ }),

/***/ 690:
/***/ (function(module, exports) {

module.exports = "<div class=\"contain-category\" *ngIf=\"getCategory\">\n  <div class=\"header\">{{ getCategory.label }}</div>\n  <div class=\"list\">\n    <div *ngFor=\"let artist of getCategory.artists\" >\n      <div class=\"list_item\" (click)=\"gotoDetail(artist)\">{{ artist.name }}</div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 691:
/***/ (function(module, exports) {

module.exports = "<h3>Featured Artists</h3>\n<div class=\"grid grid-pad\">\n  <div *ngFor=\"let artist of artists\" (click)=\"gotoDetail(artist)\" class=\"col-1-4\">\n    <div class=\"module artist\" [style.background]=\"'url(./assets/featured/' +  artist.id + '.jpg)'\">\n      <h4>{{ artist.name }}</h4>\n    </div>\n  </div>\n</div>\n<artist-search></artist-search>\n"

/***/ }),

/***/ 692:
/***/ (function(module, exports) {

module.exports = "<div class=\"contain-videos\">\n  <div class=\"current\" id=\"current-video\" [innerHtml]=\"sanitizer.bypassSecurityTrustHtml(_current.link)\"></div>\n  <div class=\"list\" [style.height.px]=\"_current.height\">\n    <div *ngFor=\"let video of _videos\">\n      <div class=\"list_item\" (click)=\"'_current=video'\"><img [width]=\"video.thumbnail.width\" [height]=\"video.thumbnail.height\" [src]=\"video.thumbnail.url\" />{{ video.title }}</div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 710:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(394);


/***/ })

},[710]);
//# sourceMappingURL=main.bundle.map
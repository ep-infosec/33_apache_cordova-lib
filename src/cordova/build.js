/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

const cordovaUtil = require('./util');
const HooksRunner = require('../hooks/HooksRunner');
const cordovaPrepare = require('./prepare');
const cordovaCompile = require('./compile');

// Returns a promise.
module.exports = function build (options) {
    return Promise.resolve().then(function () {
        const projectRoot = cordovaUtil.cdProjectRoot();
        options = cordovaUtil.preProcessOptions(options);

        // fire build hooks
        const hooksRunner = new HooksRunner(projectRoot);
        return hooksRunner.fire('before_build', options)
            .then(function () {
                return cordovaPrepare(options);
            }).then(function () {
                return cordovaCompile(options);
            }).then(function () {
                return hooksRunner.fire('after_build', options);
            });
    });
};

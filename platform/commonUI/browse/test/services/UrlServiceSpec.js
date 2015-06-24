/*****************************************************************************
 * Open MCT Web, Copyright (c) 2014-2015, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT Web is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT Web includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/
/*global define,Promise,describe,it,expect,beforeEach,waitsFor,jasmine*/

/**
 * MCTRepresentationSpec. Created by vwoeltje on 11/6/14.
 */
define(
    ["../../src/services/UrlService"],
    function (UrlService) {
        "use strict";

        describe("The url service", function () {
            var urlService,
                mockLocation;

            beforeEach(function () {
                // Creates a mockLocation, used to 
                // do the view search
                mockLocation = jasmine.createSpyObj(
                    "$location",
                    [ "path", "search" ]
                );
                
                urlService = new UrlService(mockLocation);
            });
            
            it("get url for a domainObject and mode", function () {
                // The mockDomainObject is initialized as a 
                // spy object to ultimately be passed into the
                // urlService urlFor function
                var mockDomainObject = jasmine.createSpyObj(
                    "domainObject",
                    [ "getId", "getCapability", "getModel", "useCapability" ]
                ),
                    mockContext = jasmine.createSpyObj('context', ['getPath']),
                    testViews = [
                        { key: 'abc' },
                        { key: 'def', someKey: 'some value' },
                        { key: 'xyz' }
                    ],
                    mockMode = "browse";
                
                // The mockContext is set a path
                // for the mockDomainObject
                mockContext.getPath.andReturn(
                    [mockDomainObject]
                );
                
                // view capability used with the testviews made
                mockDomainObject.useCapability.andCallFake(function (c) {
                    return (c === 'view') && testViews;
                });
                
                // context capability used with the mockContext created
                // so the variables including context in the urlFor are
                // initialized and reached
                mockDomainObject.getCapability.andCallFake(function (c) {
                    return c === 'context' && mockContext;
                });
                
                // Uses the mockLocation to get the current
                // "mock" website's view
                mockLocation.search.andReturn({ view: 'def' });
                urlService.urlFor(mockMode, mockDomainObject);
            });
        });
    }
);
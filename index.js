var app = angular.module("OnlyRecipes", []); 
app.controller("myCtrl", function($scope, $window) 
{
    $scope.ingredients = [];
    $scope.recipe = new recipe;
    $scope.user = new user();
    // Called when the "Add Recipe" button is called, gets what's currently in 
    // the instructions text box (Will ask if its going to change what was already input)
    // and then goes to success.html
    $scope.addToRecipes = function()
    {
        if($scope.ingredients.length == 0)
        {
            $scope.addIngredient();
        }
        $scope.addInstruction();
        if($scope.recipe.instructions == "")
        {
            if(confirm("Your recipe instructions are empty, is that OK?")){}
            else{return;}
        }
        if($scope.recipe.ingredients.length == 0)
        {
            if(confirm("Your recipe ingredients are empty, are you sure that's right?")){}
            else{return;}
        }
        if($scope.recipe.imageUrl == "")
        {
            if(confirm("You don't have an image for your recipe, is that OK?")){}
            else{return;}
        }
        $scope.user.recipes.push($scope.recipe);
        console.log($scope.user);
        $window.location.href = "success.html";
    }
    // Add an ingredient to the list of ingredients, OR process a multi-line list of ingredients
    // into an array of ingredients, then assign it to the recipe we are holding in the scope
    $scope.addIngredient = function () 
    {
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        var strs = $scope.addMe.split('\n');
        
        if(strs.length == 1)
        {
          $scope.ingredients.push(strs[0]);
        }
        else
        {
          $scope.ingredients = strs;
        }
        document.getElementById("ingInput").value = "";
        $scope.recipe.ingredients = $scope.ingredients;
    }
    // Grab the image URL from the input field and assign it properly. 
    // If its empty don't change things, OR if the current string is a 
    // substring of the current url (they are backspacing) don't change things
    $scope.addURL = function()
    {
      if($scope.imageURL == "" || $scope.recipe.imageUrl.includes($scope.imageURL)){}
      else
      {
        $scope.recipe.imageUrl = $scope.imageURL;
      }
    }
    // The enter key should trigger the addIngredients function while in the 
    // ingredients text box
    $scope.keyPress = function($event)
    {
      var key = $event.keyCode;
      if (key === 13)
      {
        $scope.addIngredient();
        $scope.addInstruction();
      }
    }
    // Remove the ingredient chosen
    $scope.removeIngredient = function (x) 
    {
        $scope.errortext = "";    
        $scope.ingredients.splice(x, 1);
    }
    // Assign the text in the instructions box to the recipe's instructions
    // Check if they are different and ask for confirmation before changing them.
    // If its empty don't do anything
    $scope.addInstruction = function () 
    {
      if($scope.instructionsText == "") {}
      else if(!($scope.instructionsText == $scope.recipe.instructions) 
        && $scope.recipe.instructions != "")
      {
          if(confirm("You want to overwrite the current instructions?"))
          {
              $scope.recipe.instructions = $scope.instructionsText
          }
          else{return;}
      }
      else
      { 
        $scope.recipe.instructions = $scope.instructionsText
      }
    }
});

class user 
{
    recipes = [];
    username = "";
    password = "";
}

class recipe
{
    ingredients = [];
    instructions = "";
    imageUrl = "";
}
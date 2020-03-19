var app = angular.module("OnlyRecipes", []); 
app.controller("myCtrl", function($scope, $window) 
{
    $scope.ingredients = [];
    $scope.recipe = new recipe;
    $scope.currRecipe = new recipe;
    $scope.NoRecipes = "You have no recipes yet! Click below to add one!"
    if(localStorage.getItem("user") == undefined)
    {
      $scope.user = new user();
    }
    else
    {
      $scope.user = JSON.parse(localStorage.getItem("user"))
      if($scope.user.recipes.length != 0)
      {
        $scope.NoRecipes = "";
      }
    }

    $scope.init = function()
    {
      localStorage.setItem("user", JSON.stringify($scope.user))
      if(localStorage.getItem("user") != null)
      {
        $scope.user = JSON.parse(localStorage.getItem("user"))
        console.log($scope.user)
      }
      else
      {
        console.log("no user to retrieve");
      }
    }
    // Called when the "Add Recipe" button is called, gets what's currently in 
    // the instructions text box (Will ask if its going to change what was already input)
    // and then goes to success.html
    $scope.addToRecipes = function()
    {
        $scope.recipe.title = $scope.RecipeTitle;
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
        if($scope.recipe.title == "")
        {
          if(confirm("You don't have a name for your dish, is that ok?")){}
          else{return;}
        }
        $scope.user.recipes.push($scope.recipe);
        localStorage.setItem("user", JSON.stringify($scope.user))
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
        filtered = [];
        strs.forEach(element => {
          if(element==" " || element=="" || element==undefined || element==null){}
          else
          {
            filtered.push(element);
          }
        });
        strs = filtered;
        console.log(strs)
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
      if($scope.instructionsText == "" || 
         $scope.instructionsText == $scope.recipe.instructions) {}
      else if(($scope.instructionsText != $scope.recipe.instructions)
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
    
    $scope.addTitle = function() 
    {
        console.log("In addTitle");
        if(!$scope.RecipeTitle || $scope.recipe.title.includes($scope.RecipeTitle)){}
        else
        {
            $scope.recipe.title = $scope.RecipeTitle;
            console.log($scope.recipe.title);
        }
    }
    
    $scope.login = function()
    {
      $scope.user.username = $scope.userText;
      $scope.user.password = $scope.passwordText;
      localStorage.setItem("user",$scope.userText);
      console.log($scope.inputText1);
      console.log($scope.userText);
      //document.getElementById("userID").innerHTML = localStorage.getItem("user");
      $scope.setDummyData()
      $window.location.href ="myRecipes.html";
    }

    $scope.getRecipeData = function()
    {
      $scope.currRecipe = localStorage.getItem("currRecipe");
      console.log($scope.currRecipe);
    }
    
    $scope.makeUser = function()
    {
      document.getElementById("recipeName").innerHTML = "Paragraph changed!";
    }
    
    
    $scope.setDummyData = function()
    {
      console.log("setting dummy data")
      //$scope.recipe.instructions = "sdfjaisdofjsoifjosdijfoidsjfods";
      //localStorage.setItem("currRecipe",this.recipe);
      this.recipe.title = "Spaghetti";
      this.recipe.imageUrl ="https://www.errenskitchen.com/wp-content/uploads/2015/02/Quick-Easy-Spaghetti-Bolognese2-1-500x480.jpg";
      this.recipe.ingredients = ["noodles","tomato sauce", "brown sugar", "1/2 lb ground beef","3 onions"];
      this.recipe.instructions = "Combine milk with vinegar in a medium bowl and set aside for 5 minutes to sour. Combine flour, sugar, baking powder, baking soda, and salt in a large mixing bowl. Whisk egg and butter into soured milk. Pour the flour mixture into the wet ingredients and whisk until lumps are gone.Heat a large skillet over medium heat, and coat with cooking spray. Pour 1/4 cupfuls of batter onto the skillet, and cook until bubbles appear on the surface. Flip with a spatula, and cook until browned on the other side.";
      
      localStorage.setItem("currRecipe",JSON.stringify(this.recipe));
    }

    $scope.setCurrRecipe = function(toSet)
    {
      toStore = new recipe;
      toStore.title = toSet.title;
      toStore.instructions = toSet.instructions;
      toStore.imageUrl = toSet.imageUrl
      toStore.ingredients = toSet.ingredients
      console.log("In setCurrRecipe", toStore);
      localStorage.setItem("currRecipe", toStore);
      $window.location.href = "recipe.html";
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
    title="";
    ingredients = [];
    instructions = "";
    imageUrl = "";
}
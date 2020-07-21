using System;

namespace ServerApp.Extension
{
    public static class ExtensionCalculateAge
    {
        public static int CalculateAge(this DateTime dateOfBirh) => DateTime.Today.Year - dateOfBirh.Year;
    }
}